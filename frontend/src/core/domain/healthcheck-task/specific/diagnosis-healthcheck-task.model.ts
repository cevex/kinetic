import { HealthcheckTask } from '../healthcheck-task.model';

export interface DiagnosisHealthcheckTask extends HealthcheckTask {
    type: 'diagnosis';
    diagnosisId: string;
}
