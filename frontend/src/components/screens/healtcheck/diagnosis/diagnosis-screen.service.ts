import { TreatmentArea } from '../../../../core/domain/diagnosis/treatment-area.model';
import { TreatmentAreaDataService } from '../../../../core/domain/diagnosis/treatment-area.service';
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
                <TreatmentArea>TreatmentAreaDataService.getDiagnosisById(diagnosisTask.diagnosisId)
        };
    }
}
