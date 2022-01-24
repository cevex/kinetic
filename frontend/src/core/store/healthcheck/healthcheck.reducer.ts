import { cloneDeep } from 'lodash-es';
import { BodyAreaType } from '../../domain/body/body-area-data.model';
import { PainAreaChoice } from '../../domain/healthcheck-task/choice/pain-area-choice.model';
import { PainAssessChoiceTripleType } from '../../domain/healthcheck-task/choice/pain-assessment-choice.model';
import { HealthcheckTaskService } from '../../domain/healthcheck-task/healthcheck-task.service';
import { ChangeLocationHealthcheck } from '../../domain/healthcheck-task/specific/change-location-healthcheck-task.model';
import { ExerciseHealthcheckTask } from '../../domain/healthcheck-task/specific/exercise-healthcheck-task.model';
import { RedoHealthcheckTask } from '../../domain/healthcheck-task/specific/redo-healthcheck-task.model';
import {
    AssessExerciseAction,
    ChooseLocationAction,
    EndHealthcheckAction,
    HealthcheckAction
} from './healthcheck.actions';
import { Healthcheck } from './healthcheck.model';

export class HealthcheckReducer {
    private static initialState: Healthcheck = {
        treatmentStart: false,
        showDisclaimer: true,
        taskId: HealthcheckTaskService.findRootTask().id,
        previousTaskId: []
    };

    constructor() {}

    public static healthcheckReducer = (
        state = this.initialState,
        action: HealthcheckAction
    ): Healthcheck => {
        switch (action.type) {
            case 'SEE_GUIDE':
                return this.seeHealthcheckGuide(state);
            case 'CHOOSE_LOCATION':
                return this.chooseLocation(state, (<ChooseLocationAction>action).choice);
            case 'ASSESS_EXERCISE':
                return this.assessExercise(state, (<AssessExerciseAction>action).choiceType);
            case 'REDO_EXERCISE':
                return this.redoExercise(state);
            case 'END_HEALTHCHECK':
                return this.endHealthcheck(state, (<EndHealthcheckAction>action).endTaskId);
            default:
                return state;
        }
    };

    private static seeHealthcheckGuide(healthcheck: Healthcheck): Healthcheck {
        const newHealthcheck = cloneDeep(healthcheck);
        newHealthcheck.treatmentStart = true;
        return newHealthcheck;
    }

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
            return this.chooseLocation(healthcheck, <ChangeLocationHealthcheck>newTask);
        } else {
            const newHealthcheck = this.addTask(healthcheck, newTaskId);
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
        return this.addTask(healthcheck, redoTask.exerciseTaskToRedo);
    }

    private static chooseLocation(healthcheck: Healthcheck, choice: PainAreaChoice): Healthcheck {
        const moreTask = HealthcheckTaskService.findTaskById(choice.more);
        if (moreTask.type === 'change-location') {
            return this.chooseLocation(healthcheck, <ChangeLocationHealthcheck>moreTask);
        } else {
            const newHealthcheck = this.addTask(healthcheck, choice.more);
            newHealthcheck.bodyArea = choice.bodyArea;
            return newHealthcheck;
        }
    }

    private static shouldShowHealthcheckGuide(healthcheck: Healthcheck): boolean {
        const currentTask = HealthcheckTaskService.findTaskById(healthcheck.taskId);
        return (
            currentTask.type === 'exercise' &&
            !healthcheck.treatmentStart &&
            healthcheck.showDisclaimer
        );
    }

    private static endHealthcheck(healthcheck: Healthcheck, endTaskId: string): Healthcheck {
        return this.addTask(healthcheck, endTaskId);
    }

    // =======================================================================
    //                Task Utils
    // =======================================================================

    private static addTask(treatment: Healthcheck, newTaskId: string) {
        const newHealthcheck = cloneDeep(treatment);
        newHealthcheck.previousTaskId.push(treatment.taskId);
        newHealthcheck.taskId = newTaskId;
        return newHealthcheck;
    }

    // =======================================================================
    //                Filter
    // =======================================================================

    public static filterByPlace(
        healthcheckList: Healthcheck[],
        bodyArea: BodyAreaType
    ): Healthcheck[] {
        return healthcheckList.filter(healthcheck => healthcheck.bodyArea === bodyArea);
    }
}
