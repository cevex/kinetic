import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiagnosisHealthcheckTask } from '~/app/modules/core/domain/healthcheck-task/specific/diagnosis-healthcheck-task.model';
import { ExerciseHealthcheckTask } from '~/app/modules/core/domain/healthcheck-task/specific/exercise-healthcheck-task.model';
import { CacheService } from '../../common/cache/cache.service';
import { HealthcheckTaskDataService } from './healthcheck-task-data.service';
import { HealthcheckTask, HealthcheckTaskType } from './healthcheck-task.model';

@Injectable({
    providedIn: 'root'
})
export class HealthcheckTaskServiceCache extends CacheService<HealthcheckTask[]> {

    constructor(private healthcheckTaskService: HealthcheckTaskDataService) {
        super();
    }

    protected getData(): Observable<HealthcheckTask[]> {
        return this.healthcheckTaskService.getTasks();
    }

    // =======================================================================
    //                Find
    // =======================================================================

    public findTask(taskId: string): HealthcheckTask {
        return this.getFlat().find(task => task.id === taskId);
    }

    public findRootTask(): HealthcheckTask {
        return this.getFlat().find(task => task.root);
    }

    // =======================================================================
    //                Filter
    // =======================================================================

    public filterTaskByType(type: HealthcheckTaskType): HealthcheckTask[] {
        return this.healthcheckTaskService.filterTaskByType(this.getFlat(), type);
    }

    public filterTaskById(taskIds: string[]): HealthcheckTask[] {
        return this.healthcheckTaskService.filterTaskById(this.getFlat(), taskIds);
    }

    public filterTaskByIds(tasks: HealthcheckTask[], type: HealthcheckTaskType): HealthcheckTask[] {
        return tasks.filter(task => task.type === type);
    }

    public filterTaskByExercises(exerciseId: string): HealthcheckTask[] {
        return this.filterTaskByType('exercise')
            .filter(task => (<ExerciseHealthcheckTask>task).exerciseId === exerciseId);
    }

    public filterTaskByDiagnosis(diagnosisId: string): HealthcheckTask[] {
        return this.filterTaskByType('diagnosis')
            .filter(task => (<DiagnosisHealthcheckTask>task).diagnosisId === diagnosisId);
    }
}
