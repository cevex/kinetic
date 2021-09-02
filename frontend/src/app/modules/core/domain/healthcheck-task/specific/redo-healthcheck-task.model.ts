import { HealthcheckTask } from '../healthcheck-task.model';

export class RedoHealthcheckTask extends HealthcheckTask {
    exerciseTaskToRedo: string;
    exerciseIdAdditional?: string;

}
