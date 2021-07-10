import { BodyAreaType } from '~/app/modules/core/domain/body/body-area-data.model';
import { HealthcheckTask } from '../healthcheck-task/healthcheck-task.model';

export interface Healthcheck {
    treatmentStart?: boolean;
    showDisclaimer?: boolean;
    bodyArea?: BodyAreaType;
    taskId: string;
    previousTaskId: string[];
}
