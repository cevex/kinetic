import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseHealthcheckTask } from '~/app/modules/core/domain/healthcheck-task/specific/exercise-healthcheck-task.model';
import { HealthcheckTask, HealthcheckTaskType } from './healthcheck-task.model';

@Injectable({
    providedIn: 'root'
})
export class HealthcheckTaskDataService {

    private TREATMENT_URL = '~/assets/mock/treatment-tasks.mock.json';

    constructor(
        private http: HttpClient
    ) {
    }

    public getTasks(): Observable<HealthcheckTask[]> {
        return this.http.get<HealthcheckTask[]>(this.TREATMENT_URL);
    }

    public filterTaskByType(tasks: HealthcheckTask[], type: HealthcheckTaskType): HealthcheckTask[] {
        return tasks.filter(task => task.type === type);
    }

    public filterTaskById(tasks: HealthcheckTask[], taskIds: string[]): HealthcheckTask[] {
        return tasks.filter(task => taskIds.includes(task.id));
    }

    public filterTaskByExercises(tasks: HealthcheckTask[], exerciseId: string): HealthcheckTask[] {
        return this.filterTaskByType(tasks,'exercise')
            .filter(task => (<ExerciseHealthcheckTask>task).exerciseId === exerciseId);
    }
}
