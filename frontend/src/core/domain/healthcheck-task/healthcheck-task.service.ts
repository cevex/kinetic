import backBarTaskJson from '../../../assets/data/healthcheck/healthcheck-tasks-back-bar.data.json';
import backZoneTaskJson from '../../../assets/data/healthcheck/healthcheck-tasks-back-zone.data.json';
import buttockTaskJson from '../../../assets/data/healthcheck/healthcheck-tasks-buttock.data.json';
import rootTaskJson from '../../../assets/data/healthcheck/healthcheck-tasks-root.data.json';
import sacroTaskJson from '../../../assets/data/healthcheck/healthcheck-tasks-sacro.data.json';
import { HealthcheckTask, HealthcheckTaskType } from './healthcheck-task.model';
import { DiagnosisHealthcheckTask } from './specific/diagnosis-healthcheck-task.model';
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

    public static findRootTask(tasks: HealthcheckTask[]): HealthcheckTask {
        return tasks.find(task => task.root);
    }

    public static findTaskById(tasks: HealthcheckTask[], taskIds: string): HealthcheckTask {
        return tasks.find(task => taskIds.includes(task.id));
    }

    // =======================================================================
    //                Filter
    // =======================================================================

    public static filterTaskByType(
        tasks: HealthcheckTask[],
        type: HealthcheckTaskType
    ): HealthcheckTask[] {
        return tasks.filter(task => task.type === type);
    }

    public static filterTaskByIds(tasks: HealthcheckTask[], taskIds: string[]): HealthcheckTask[] {
        return tasks.filter(task => taskIds.includes(task.id));
    }

    public static filterTaskByExercises(
        tasks: HealthcheckTask[],
        exerciseId: string
    ): HealthcheckTask[] {
        return this.filterTaskByType(tasks, 'exercise').filter(
            task => (<ExerciseHealthcheckTask>task).exerciseId === exerciseId
        );
    }

    public static filterTaskByDiagnosis(
        tasks: HealthcheckTask[],
        diagnosisId: string
    ): HealthcheckTask[] {
        return this.filterTaskByType(tasks, 'diagnosis').filter(
            task => (<DiagnosisHealthcheckTask>task).diagnosisId === diagnosisId
        );
    }
}
