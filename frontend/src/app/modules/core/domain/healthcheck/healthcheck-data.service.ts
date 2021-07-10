import { Injectable } from '@angular/core';
import cloneDeep from 'lodash-es/cloneDeep';
import { BodyAreaType } from '~/app/modules/core/domain/body/body-area-data.model';
import { PainAssessmentChoiceType } from '~/app/modules/core/domain/healthcheck-task/choice/pain-assessment-choice.model';
import { HealthcheckTaskDataService } from '~/app/modules/core/domain/healthcheck-task/healthcheck-task-data.service';
import { HealthcheckTaskServiceCache } from '~/app/modules/core/domain/healthcheck-task/healthcheck-task-data.service.cache';
import { ExerciseHealthcheckTask } from '~/app/modules/core/domain/healthcheck-task/specific/exercise-healthcheck-task.model';
import { RedoHealthcheckTask } from '~/app/modules/core/domain/healthcheck-task/specific/redo-healthcheck-task.model';
import { PainAreaChoice } from '../healthcheck-task/choice/pain-area-choice.model';
import { Healthcheck } from './healthcheck-data.model';

@Injectable({
    providedIn: 'root'
})
export class HealthcheckDataService {

    constructor(
        private taskDataService: HealthcheckTaskDataService,
        private taskServiceCache: HealthcheckTaskServiceCache
    ) {
    }

    public startHealthcheck(): Healthcheck {
        return {
            treatmentStart: false,
            showDisclaimer: true,
            bodyArea: null,
            taskId: this.taskServiceCache.findRootTask().id,
            previousTaskId: []
        };
    }

    /**
     * Count the occurrences of exercises in the healthcheck
     */
    public assessExercise(healthcheck: Healthcheck, choiceType: PainAssessmentChoiceType): Healthcheck {
        const exerciseTask = <ExerciseHealthcheckTask>this.taskServiceCache.findTask(healthcheck.taskId);

        const choiceToApply = this.validateAssessmentChoice(healthcheck, exerciseTask, choiceType);
        const newTaskId = exerciseTask.choice[choiceToApply];

        healthcheck.treatmentStart = true;
        return this.addTask(healthcheck, newTaskId);
    }

    private validateAssessmentChoice(healthcheck: Healthcheck, exerciseTask: ExerciseHealthcheckTask, choiceType: PainAssessmentChoiceType) {
        if (choiceType !== 'equal') return choiceType;
        const healthcheckTasks = this.taskServiceCache.filterTaskById(healthcheck.previousTaskId);
        const exerciseTries = this.taskDataService.filterTaskByExercises(healthcheckTasks, exerciseTask.exerciseId);
        console.log('exerciseTries', exerciseTries.length);
        return exerciseTries.length > 0 ? 'more' : choiceType;
    }

    public redoExercise(healthcheck: Healthcheck): Healthcheck {
        const redoTask = <RedoHealthcheckTask>this.taskServiceCache.findTask(healthcheck.taskId);
        return this.addTask(healthcheck, redoTask.exerciseId);
    }

    public chooseLocation(healthcheck: Healthcheck, choice: PainAreaChoice): Healthcheck {
        const newHealthcheck = this.addTask(healthcheck, choice.more);
        newHealthcheck.bodyArea = choice.bodyArea;
        return newHealthcheck;
    }

    public seeHealthcheckGuide(healthcheck: Healthcheck): Healthcheck {
        const newHealthcheck = cloneDeep(healthcheck);
        newHealthcheck.treatmentStart = true;
        return newHealthcheck;
    }

    public shouldShowHealthcheckGuide(healthcheck: Healthcheck): boolean {
        const currentTask = this.taskServiceCache.findTask(healthcheck.taskId);
        return currentTask.type === 'exercise' &&
            !healthcheck.treatmentStart &&
            healthcheck.showDisclaimer;
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
