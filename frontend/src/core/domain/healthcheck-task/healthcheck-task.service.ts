import backBarTaskJson from '../../../assets/data/healthcheck/healthcheck-tasks-back-bar.data.json';
import backZoneTaskJson from '../../../assets/data/healthcheck/healthcheck-tasks-back-zone.data.json';
import buttockTaskJson from '../../../assets/data/healthcheck/healthcheck-tasks-buttock.data.json';
import rootTaskJson from '../../../assets/data/healthcheck/healthcheck-tasks-root.data.json';
import sacroTaskJson from '../../../assets/data/healthcheck/healthcheck-tasks-sacro.data.json';
import { BodyArea } from '../body/body-area-data.model';
import { BodyAreaDataService } from '../body/body-area-data.service';
import { Exercise } from '../exercices/exercise.model';
import { ExercisesService } from '../exercices/exercises.service';
import { HealthcheckTask, HealthcheckTaskType } from './healthcheck-task.model';
import { ChangeLocationHealthcheckTask } from './specific/change-location-healthcheck-task.model';
import { ExerciseHealthcheckTask } from './specific/exercise-healthcheck-task.model';
import { TestLocationHealthcheckTask } from './specific/test-location-healthcheck-task.model';

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

    public static getTaskByType(type: HealthcheckTaskType): HealthcheckTask[] {
        return this.getTasks().filter(task => task.type === type);
    }

    private static mergeTasks(tasksList: HealthcheckTask[][]): HealthcheckTask[] {
        if (!tasksList) return [];
        return tasksList.reduce((alltasks, tasks) => {
            return tasks ? alltasks.concat(tasks) : alltasks;
        }, []);
    }

    // =======================================================================
    //                Read
    // =======================================================================

    public static getExercise(exerciseTask: ExerciseHealthcheckTask): Exercise {
        return (
            exerciseTask &&
            exerciseTask.exerciseId &&
            <Exercise>ExercisesService.getExercisesById(exerciseTask.exerciseId)
        );
    }

    public static getBodyAreas(testLocationTask: TestLocationHealthcheckTask): BodyArea[] {
        const painChoicesIds = testLocationTask && testLocationTask.painChoices;
        console.log('[getBodyAreas] testLocationTask', testLocationTask);
        console.log('[getBodyAreas] painChoicesIds', painChoicesIds);
        const bodyAreasTypes = painChoicesIds.map(painChoicesId => {
            const changeLocationTask = <ChangeLocationHealthcheckTask>(
                HealthcheckTaskService.findTaskById(painChoicesId)
            );
            console.log('[getBodyAreas] changeLocationTask', changeLocationTask);

            return changeLocationTask.bodyArea;
        });
        console.log('[getBodyAreas] bodyAreasTypes', bodyAreasTypes);
        return BodyAreaDataService.getBodyAreasByTypes(bodyAreasTypes);
    }

    // =======================================================================
    //                Find
    // =======================================================================

    public static findRootTask(): HealthcheckTask {
        return this.getTasks().find(task => task.root);
    }

    public static findTaskById(taskId: string): HealthcheckTask {
        return this.getTasks().find(task => taskId === task.id);
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
