import { Diagnosis } from '../../../../core/domain/diagnosis/diagnosis.model';
import { DiagnosisDataService } from '../../../../core/domain/diagnosis/diagnosis.service';
import { HealthcheckTaskService } from '../../../../core/domain/healthcheck-task/healthcheck-task.service';
import { DiagnosisHealthcheckTask } from '../../../../core/domain/healthcheck-task/specific/diagnosis-healthcheck-task.model';
import { DiagnosisScreenState } from './diagnosis-screen.model';

export class DiagnosisScreenService {
    public static initScreen(taskId: string): DiagnosisScreenState {
        const diagnosisTask = <DiagnosisHealthcheckTask>HealthcheckTaskService.findTaskById(taskId);
        return {
            diagnosis:
                diagnosisTask &&
                diagnosisTask.diagnosisId &&
                <Diagnosis>DiagnosisDataService.getDiagnosisById(diagnosisTask.diagnosisId)
        };
    }
}
