import { HealthcheckTaskService } from '../../../../core/domain/healthcheck-task/healthcheck-task.service';
import { DiagnosisHealthcheckTask } from '../../../../core/domain/healthcheck-task/specific/diagnosis-healthcheck-task.model';
import { TreatmentArea } from '../../../../core/domain/treatment-area/treatment-area.model';
import { TreatmentAreaDataService } from '../../../../core/domain/treatment-area/treatment-area.service';
import { DiagnosisScreenState } from './diagnosis-screen.model';

export class DiagnosisScreenService {
    public static initScreen(taskId: string): DiagnosisScreenState {
        const diagnosisTask = <DiagnosisHealthcheckTask>HealthcheckTaskService.findTaskById(taskId);
        return {
            diagnosis:
                diagnosisTask &&
                diagnosisTask.diagnosisId &&
                <TreatmentArea>(
                    TreatmentAreaDataService.getTreatmentAreasById(diagnosisTask.diagnosisId)
                )
        };
    }
}
