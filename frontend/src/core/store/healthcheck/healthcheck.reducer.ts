import { cloneDeep } from 'lodash-es';
import { BodyAreaType } from '../../domain/body/body-area-data.model';
import { BodyAreaDataService } from '../../domain/body/body-area-data.service';
import { PainAreaChoice } from '../../domain/healthcheck-task/choice/pain-area-choice.model';
import { PainAssessChoiceTripleType } from '../../domain/healthcheck-task/choice/pain-assessment-choice.model';
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
        treatmentStart: false,
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
                return this.startHealthcheck(state);
            case 'CHOOSE_LOCATION':
                return this.selectLocation(state, (<ChooseLocationAction>action).bodyAreas);
            case 'ASSESS_EXERCISE':
                return this.assessExercise(state, (<AssessExerciseAction>action).choiceType);
            case 'REDO_EXERCISE':
                return this.redoExercise(state);
            // case 'END_HEALTHCHECK':
            //     return this.endHealthcheck(state, (<EndHealthcheckAction>action).endTaskId);
            default:
                return state;
        }
    };

    // =======================================================================
    //               Workflow
    // =======================================================================

    private static startHealthcheck(healthcheck: Healthcheck): Healthcheck {
        const newHealthcheck = cloneDeep(healthcheck);
        newHealthcheck.treatmentStart = true;
        return newHealthcheck;
    }

    private static endHealthcheck(healthcheck: Healthcheck, endTaskId: string): Healthcheck {
        return HealthcheckService.addTask(healthcheck, endTaskId);
    }

    // =======================================================================
    //               Location
    // =======================================================================

    private static selectLocation(
        healthcheck: Healthcheck,
        choiceAreas: BodyAreaType[]
    ): Healthcheck {
        const choiceToTreat = this.getTaskToTreat(choiceAreas);
        console.log('[selectLocation] choiceAreas', choiceAreas);
        console.log('[selectLocation] choiceToTreat', choiceToTreat);
        return this.chooseLocation(healthcheck, <PainAreaChoice>choiceToTreat);
    }

    private static getTaskToTreat(choiceAreas: BodyAreaType[]): ChangeLocationHealthcheckTask {
        const bodyAreaToTreat = BodyAreaDataService.getMainArea(choiceAreas);
        console.log('[getTaskToTreat] bodyAreaToTreat', bodyAreaToTreat);
        console.log(
            '[getTaskToTreat] changeLocation',
            HealthcheckTaskService.getTaskByType('change-location')
        );
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
        const newTaskId = exerciseTask.choice[choiceToApply];
        const newTask = HealthcheckTaskService.findTaskById(newTaskId);

        if (newTask.type === 'change-location') {
            return this.chooseLocation(healthcheck, <ChangeLocationHealthcheckTask>newTask);
        } else {
            const newHealthcheck = HealthcheckService.addTask(healthcheck, newTaskId);
            newHealthcheck.treatmentStart = true;
            return newHealthcheck;
        }
    }

    private static validateAssessmentChoice(
        healthcheck: Healthcheck,
        exerciseTask: ExerciseHealthcheckTask,
        choiceType: PainAssessChoiceTripleType
    ): PainAssessChoiceTripleType {
        if (choiceType !== 'equal') return choiceType;
        const healthcheckTasks = HealthcheckTaskService.filterTaskByIds(healthcheck.previousTaskId);
        const exerciseTries = HealthcheckTaskService.filterTaskByExercises(
            healthcheckTasks,
            exerciseTask.exerciseId
        );
        return exerciseTries.length > 0 ? 'more' : choiceType;
    }

    private static redoExercise(healthcheck: Healthcheck): Healthcheck {
        const redoTask = <RedoHealthcheckTask>(
            HealthcheckTaskService.findTaskById(healthcheck.taskId)
        );
        return HealthcheckService.addTask(healthcheck, redoTask.exerciseTaskToRedo);
    }
}
