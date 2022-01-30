import { cloneDeep } from 'lodash-es';
import { BodyAreaType } from '../../domain/body/body-area-data.model';
import { HealthcheckTaskService } from '../../domain/healthcheck-task/healthcheck-task.service';
import { Healthcheck } from './healthcheck.model';

export class HealthcheckService {
    constructor() {}

    // =======================================================================
    //                Reader
    // =======================================================================

    private static getCurrentTask(healthcheck: Healthcheck) {
        return HealthcheckTaskService.findTaskById(healthcheck.taskId);
    }

    private static getCurrentTaskType(healthcheck: Healthcheck) {
        return this.getCurrentTask(healthcheck).type;
    }

    // =======================================================================
    //                Controls
    // =======================================================================

    public static hasBodyArea(healthcheck: Healthcheck): boolean {
        return healthcheck.previousTaskId.length === 1;
    }

    public static shouldShowHealthcheckGuide(healthcheck: Healthcheck): boolean {
        return healthcheck.previousTaskId.length === 1;
    }

    // =======================================================================
    //                Sub Task
    // =======================================================================

    public static addTask(treatment: Healthcheck, newTaskId: string) {
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
