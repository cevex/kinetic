import { HealthcheckTask } from '../healthcheck-task.model';

export interface RedoHealthcheckTask extends HealthcheckTask {
    exerciseTaskToRedo: string;
    exerciseIdAdditional?: string;
}
