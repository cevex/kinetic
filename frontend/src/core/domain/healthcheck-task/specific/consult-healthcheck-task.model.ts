import { HealthcheckTask } from '../healthcheck-task.model';

export interface ConsultHealthcheckTask extends HealthcheckTask {
    type: 'consult';
    somethings?: string;
}
