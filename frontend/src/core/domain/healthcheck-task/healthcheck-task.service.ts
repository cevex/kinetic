import backBarTaskJson from '../../../assets/data/healthcheck/healthcheck-tasks-back-bar.data.json';
import backZoneTaskJson from '../../../assets/data/healthcheck/healthcheck-tasks-back-zone.data.json';
import buttockTaskJson from '../../../assets/data/healthcheck/healthcheck-tasks-buttock.data.json';
import rootTaskJson from '../../../assets/data/healthcheck/healthcheck-tasks-root.data.json';
import sacroTaskJson from '../../../assets/data/healthcheck/healthcheck-tasks-sacro.data.json';
import { HealthcheckTask, HealthcheckTaskType } from './healthcheck-task.model';
import { ExerciseHealthcheckTask } from './specific/exercise-healthcheck-task.model';

export class HealthcheckTaskService {
    private static TREATMENT_URL: any = {
        root: rootTaskJson,
        backBar: backBarTaskJson,
        backZone: backZoneTaskJson,
        buttock: buttockTaskJson,
        sacro: sacroTaskJson
    };

    constructor() {}

    // =======================================================================
    //                Get
    // =======================================================================

    public static getTasks(): HealthcheckTask[] {
        const allTasks = <HealthcheckTask[][]>(
            Object.keys(this.TREATMENT_URL).map(urlName => this.TREATMENT_URL[urlName])
        );
        return this.mergeTasks(allTasks);
    }

    private static mergeTasks(tasksList: HealthcheckTask[][]): HealthcheckTask[] {
        if (!tasksList) return [];
        return tasksList.reduce((alltasks, tasks) => {
            return tasks ? alltasks.concat(tasks) : alltasks;
        }, []);
    }

    // =======================================================================
    //                Find
    // =======================================================================

    public static findRootTask(): HealthcheckTask {
        return this.getTasks().find(task => task.root);
    }

    public static findTaskById(taskIds: string): HealthcheckTask {
        return this.getTasks().find(task => taskIds.includes(task.id));
    }

    // =======================================================================
    //                Filter
    // =======================================================================

    public static filterTaskByType(type: HealthcheckTaskType): HealthcheckTask[] {
        return this.getTasks().filter(task => task.type === type);
    }

    public static filterTaskByIds(taskIds: string[]): HealthcheckTask[] {
        return this.getTasks().filter(task => taskIds.includes(task.id));
    }

    public static filterTaskByExercises(
        tasks: HealthcheckTask[],
        exerciseId: string
    ): HealthcheckTask[] {
        return tasks.filter(task => (<ExerciseHealthcheckTask>task).exerciseId === exerciseId);
    }
}
