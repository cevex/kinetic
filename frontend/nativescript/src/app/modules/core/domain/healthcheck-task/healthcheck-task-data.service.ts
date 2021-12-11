import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExerciseHealthcheckTask } from '~/app/modules/core/domain/healthcheck-task/specific/exercise-healthcheck-task.model';
import { HealthcheckTask, HealthcheckTaskType } from './healthcheck-task.model';

@Injectable({
    providedIn: 'root'
})
export class HealthcheckTaskDataService {

    private TREATMENT_URL = {
        root: '~/assets/data/healthcheck/healthcheck-tasks-root.data.json',
        backBar: '~/assets/data/healthcheck/healthcheck-tasks-back-bar.data.json',
        backZone: '~/assets/data/healthcheck/healthcheck-tasks-back-zone.data.json',
        buttock: '~/assets/data/healthcheck/healthcheck-tasks-buttock.data.json',
        sacro: '~/assets/data/healthcheck/healthcheck-tasks-sacro.data.json',
    };


    constructor(
        private http: HttpClient
    ) {
    }

    public getTasks(): Observable<HealthcheckTask[]> {
        const calls$ = Object.keys(this.TREATMENT_URL)
            .map(urlName => this.http.get<HealthcheckTask[]>(this.TREATMENT_URL[urlName]));

        return forkJoin(calls$).pipe(
            map(tasksList => this.mergeTasks(tasksList))
        );
    }

    private mergeTasks(tasksList: HealthcheckTask[][]): HealthcheckTask[] {
        if (!tasksList) return [];
        return tasksList.reduce((alltasks, tasks) => {
            return tasks ? alltasks.concat(tasks) : alltasks;
        }, []);
    }

    public filterTaskByType(tasks: HealthcheckTask[], type: HealthcheckTaskType): HealthcheckTask[] {
        return tasks.filter(task => task.type === type);
    }

    public filterTaskById(tasks: HealthcheckTask[], taskIds: string[]): HealthcheckTask[] {
        return tasks.filter(task => taskIds.includes(task.id));
    }

    public filterTaskByExercises(tasks: HealthcheckTask[], exerciseId: string): HealthcheckTask[] {
        return this.filterTaskByType(tasks, 'exercise')
            .filter(task => (<ExerciseHealthcheckTask>task).exerciseId === exerciseId);
    }
}
