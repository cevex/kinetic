import { cloneDeep } from 'lodash-es';
import { BodyAreaType } from '../../domain/body/body-area-data.model';
import { HealthcheckTaskService } from '../../domain/healthcheck-task/healthcheck-task.service';
import { HealthcheckTask } from '../healthcheck-task/healthcheck-task.model';
import { DiagnosisHealthcheckTask } from '../healthcheck-task/specific/diagnosis-healthcheck-task.model';
import { TreatmentArea } from '../treatment-area/treatment-area.model';
import { TreatmentAreaDataService } from '../treatment-area/treatment-area.service';
import { Healthcheck } from './healthcheck.model';

export class HealthcheckService {
    constructor() {}

    // =======================================================================
    //                Reader
    // =======================================================================

    public static getCurrentTask(healthcheck: Healthcheck): HealthcheckTask {
        return HealthcheckTaskService.findTaskById(healthcheck.taskId);
    }

    public static getCurrentTaskType(healthcheck: Healthcheck) {
        return this.getCurrentTask(healthcheck).type;
    }

    public static getTreatmentArea(healthcheck: Healthcheck): TreatmentArea {
        const diagnosisTask = <DiagnosisHealthcheckTask> this.getCurrentTask(healthcheck);
        return TreatmentAreaDataService.getTreatmentAreasById(diagnosisTask.diagnosisId);
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
