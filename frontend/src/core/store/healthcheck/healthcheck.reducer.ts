import { cloneDeep } from 'lodash-es';
import { BodyAreaType } from '../../domain/body/body-area-data.model';
import { BodyAreaDataService } from '../../domain/body/body-area-data.service';
import { PainAreaChoice } from '../../domain/healthcheck-task/choice/pain-area-choice.model';
import {
    PainAssessChoiceTripleType,
    PainAssessmentChoiceTriple
} from '../../domain/healthcheck-task/choice/pain-assessment-choice.model';
import { HealthcheckTaskService } from '../../domain/healthcheck-task/healthcheck-task.service';
import { ChangeLocationHealthcheckTask } from '../../domain/healthcheck-task/specific/change-location-healthcheck-task.model';
import { ExerciseHealthcheckTask } from '../../domain/healthcheck-task/specific/exercise-healthcheck-task.model';
import { RedoHealthcheckTask } from '../../domain/healthcheck-task/specific/redo-healthcheck-task.model';
import { Healthcheck } from '../../domain/healthcheck/healthcheck.model';
import { HealthcheckService } from '../../domain/healthcheck/healthcheck.service';
import {
    AssessExerciseAction,
    ChooseLocationAction,
    HealthcheckAction
} from './healthcheck.actions';

export class HealthcheckReducer {
    private static initialState: Healthcheck = {
        treatmentStarted: false,
        disclaimerSeen: true,
        taskId: HealthcheckTaskService.findRootTask().id,
        previousTaskId: []
    };

    constructor() {}

    // =======================================================================
    //               REDUCER
    // =======================================================================

    public static healthcheckReducer = (
        state = this.initialState,
        action: HealthcheckAction
    ): Healthcheck => {
        switch (action.type) {
            case 'START_HEALTHCHECK':
                return this.startHealthcheck();
            case 'CHOOSE_LOCATION':
                return this.selectLocation(state, (<ChooseLocationAction>action).bodyAreas);
            case 'SEE_DISCLAIMER':
                return this.seeDisclaimer(state);
            case 'ASSESS_EXERCISE':
                return this.assessExercise(state, (<AssessExerciseAction>action).choiceType);
            case 'REDO_EXERCISE':
                return this.redoExercise(state);
            case 'END_HEALTHCHECK':
                return this.endHealthcheck(state);
            default:
                return state;
        }
    };

    // =======================================================================
    //               Workflow
    // =======================================================================

    private static startHealthcheck(): Healthcheck {
        const newHealthcheck = cloneDeep(this.initialState);
        newHealthcheck.treatmentStarted = true;
        return newHealthcheck;
    }

    private static seeDisclaimer(healthcheck: Healthcheck): Healthcheck {
        const newHealthcheck = cloneDeep(healthcheck);
        newHealthcheck.disclaimerSeen = true;
        return newHealthcheck;
    }

    private static endHealthcheck(healthcheck: Healthcheck): Healthcheck {
        const newHealthcheck = cloneDeep(healthcheck);
        newHealthcheck.treatmentEnded = true;
        return newHealthcheck;
    }

    // =======================================================================
    //               Location
    // =======================================================================

    private static selectLocation(
        healthcheck: Healthcheck,
        choiceAreas: BodyAreaType[]
    ): Healthcheck {
        const choiceToTreat = this.getTaskToTreat(choiceAreas);
        return this.chooseLocation(healthcheck, <PainAreaChoice>choiceToTreat);
    }

    private static getTaskToTreat(choiceAreas: BodyAreaType[]): ChangeLocationHealthcheckTask {
        const bodyAreaToTreat = BodyAreaDataService.getMainArea(choiceAreas);
        return HealthcheckTaskService.getTaskByType('change-location')
            .map(changeLocationTask => <ChangeLocationHealthcheckTask>changeLocationTask)
            .find(task => task.bodyArea === bodyAreaToTreat.type);
    }

    private static chooseLocation(healthcheck: Healthcheck, choice: PainAreaChoice): Healthcheck {
        const moreTask = HealthcheckTaskService.findTaskById(choice.more);
        if (moreTask.type === 'change-location') {
            return this.chooseLocation(healthcheck, <ChangeLocationHealthcheckTask>moreTask);
        } else {
            const newHealthcheck = HealthcheckService.addTask(healthcheck, choice.more);
            newHealthcheck.bodyArea = choice.bodyArea;
            return newHealthcheck;
        }
    }

    // =======================================================================
    //               Exercise
    // =======================================================================

    /**
     * Count the occurrences of exercises in the healthcheck
     */
    private static assessExercise(
        healthcheck: Healthcheck,
        choiceType: PainAssessChoiceTripleType
    ): Healthcheck {
        const exerciseTask = <ExerciseHealthcheckTask>(
            HealthcheckTaskService.findTaskById(healthcheck.taskId)
        );
        const choiceToApply = this.validateAssessmentChoice(healthcheck, exerciseTask, choiceType);
        const newTaskId = (<any>exerciseTask.choice)[choiceToApply];
        const newTask = HealthcheckTaskService.findTaskById(newTaskId);

        if (newTask.type === 'change-location') {
            return this.chooseLocation(healthcheck, <ChangeLocationHealthcheckTask>newTask);
        } else {
            const newHealthcheck = HealthcheckService.addTask(healthcheck, newTaskId);
            newHealthcheck.treatmentStarted = true;
            return newHealthcheck;
        }
    }

    private static validateAssessmentChoice(
        healthcheck: Healthcheck,
        exerciseTask: ExerciseHealthcheckTask,
        choiceType: PainAssessChoiceTripleType
    ): PainAssessChoiceTripleType {
        if (choiceType === 'less') return choiceType;

        const availableChoices = <PainAssessmentChoiceTriple>exerciseTask.choice;
        const doneTasks = HealthcheckTaskService.filterTaskByIds(healthcheck.previousTaskId);
        const exerciseTries = HealthcheckTaskService.filterTaskByExercises(
            doneTasks,
            exerciseTask.exerciseId
        );
        // No need to retry an exercise too much
        if (exerciseTries.length > 0) {
            return availableChoices.more2 ? 'more2' : 'more';
        }
        return choiceType;
    }

    private static redoExercise(healthcheck: Healthcheck): Healthcheck {
        const redoTask = <RedoHealthcheckTask>(
            HealthcheckTaskService.findTaskById(healthcheck.taskId)
        );
        return HealthcheckService.addTask(healthcheck, redoTask.exerciseTaskToRedo);
    }
}
