import { HealthcheckTask } from '../healthcheck-task.model';

export interface DiagnosisHealthcheckTask extends HealthcheckTask {
    diagnosisId: string;
}
