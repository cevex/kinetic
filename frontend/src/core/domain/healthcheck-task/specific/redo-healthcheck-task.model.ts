import { HealthcheckTask } from '../healthcheck-task.model';

export interface RedoHealthcheckTask extends HealthcheckTask {
    type: 'redo';
    exerciseTaskToRedo: string;
    exerciseIdAdditional?: string;
}
