import { cloneDeep } from 'lodash-es';
import { BodyAreaType } from '../body/body-area-data.model';
import { PainAreaChoice } from '../healthcheck-task/choice/pain-area-choice.model';
import { PainAssessChoiceTripleType } from '../healthcheck-task/choice/pain-assessment-choice.model';
import { HealthcheckTask } from '../healthcheck-task/healthcheck-task.model';
import { HealthcheckTaskService } from '../healthcheck-task/healthcheck-task.service';
import { ChangeLocationHealthcheck } from '../healthcheck-task/specific/change-location-healthcheck-task.model';
import { ExerciseHealthcheckTask } from '../healthcheck-task/specific/exercise-healthcheck-task.model';
import { RedoHealthcheckTask } from '../healthcheck-task/specific/redo-healthcheck-task.model';
import { Healthcheck } from './healthcheck.model';

export class HealthcheckService {
    constructor() {}

    public startHealthcheck(allTasks: HealthcheckTask[]): Healthcheck {
        return {
            treatmentStart: false,
            showDisclaimer: true,
            taskId: HealthcheckTaskService.findRootTask(allTasks).id,
            previousTaskId: []
        };
    }

    /**
     * Count the occurrences of exercises in the healthcheck
     */
    public assessExercise(
        healthcheck: Healthcheck,
        choiceType: PainAssessChoiceTripleType,
        allTasks: HealthcheckTask[]
    ): Healthcheck {
        const exerciseTask = <ExerciseHealthcheckTask>(
            HealthcheckTaskService.findTaskById(allTasks, healthcheck.taskId)
        );

        const choiceToApply = this.validateAssessmentChoice(
            healthcheck,
            exerciseTask,
            choiceType,
            allTasks
        );
        const newTaskId = exerciseTask.choice[choiceToApply];
        const newTask = HealthcheckTaskService.findTaskById(allTasks, newTaskId);

        if (newTask.type === 'change-location') {
            return this.chooseLocation(healthcheck, <ChangeLocationHealthcheck>newTask, allTasks);
        } else {
            const newHealthcheck = this.addTask(healthcheck, newTaskId);
            newHealthcheck.treatmentStart = true;
            return newHealthcheck;
        }
    }

    private validateAssessmentChoice(
        healthcheck: Healthcheck,
        exerciseTask: ExerciseHealthcheckTask,
        choiceType: PainAssessChoiceTripleType,
        allTasks: HealthcheckTask[]
    ): PainAssessChoiceTripleType {
        if (choiceType !== 'equal') return choiceType;
        const healthcheckTasks = HealthcheckTaskService.filterTaskByIds(
            allTasks,
            healthcheck.previousTaskId
        );
        const exerciseTries = HealthcheckTaskService.filterTaskByExercises(
            healthcheckTasks,
            exerciseTask.exerciseId
        );
        console.log('exerciseTries', exerciseTries.length);
        return exerciseTries.length > 0 ? 'more' : choiceType;
    }

    public redoExercise(healthcheck: Healthcheck, allTasks: HealthcheckTask[]): Healthcheck {
        const redoTask = <RedoHealthcheckTask>(
            HealthcheckTaskService.findTaskById(allTasks, healthcheck.taskId)
        );
        return this.addTask(healthcheck, redoTask.exerciseTaskToRedo);
    }

    public chooseLocation(
        healthcheck: Healthcheck,
        choice: PainAreaChoice,
        allTasks: HealthcheckTask[]
    ): Healthcheck {
        const moreTask = HealthcheckTaskService.findTaskById(allTasks, choice.more);
        if (moreTask.type === 'change-location') {
            return this.chooseLocation(healthcheck, <ChangeLocationHealthcheck>moreTask, allTasks);
        } else {
            const newHealthcheck = this.addTask(healthcheck, choice.more);
            newHealthcheck.bodyArea = choice.bodyArea;
            return newHealthcheck;
        }
    }

    public seeHealthcheckGuide(healthcheck: Healthcheck): Healthcheck {
        const newHealthcheck = cloneDeep(healthcheck);
        newHealthcheck.treatmentStart = true;
        return newHealthcheck;
    }

    public shouldShowHealthcheckGuide(
        healthcheck: Healthcheck,
        allTasks: HealthcheckTask[]
    ): boolean {
        const currentTask = HealthcheckTaskService.findTaskById(allTasks, healthcheck.taskId);
        return (
            currentTask.type === 'exercise' &&
            !healthcheck.treatmentStart &&
            healthcheck.showDisclaimer
        );
    }

    public endHealthcheck(healthcheck: Healthcheck, endTaskId: string): Healthcheck {
        return this.addTask(healthcheck, endTaskId);
    }

    // =======================================================================
    //                Task Utils
    // =======================================================================

    private addTask(treatment: Healthcheck, newTaskId: string) {
        const newHealthcheck = cloneDeep(treatment);
        newHealthcheck.previousTaskId.push(treatment.taskId);
        newHealthcheck.taskId = newTaskId;
        return newHealthcheck;
    }

    // =======================================================================
    //                Filter
    // =======================================================================

    public filterByPlace(healthcheckList: Healthcheck[], bodyArea: BodyAreaType): Healthcheck[] {
        return healthcheckList.filter(healthcheck => healthcheck.bodyArea === bodyArea);
    }
}
