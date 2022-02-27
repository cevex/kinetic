import treatmentPhaseData from '../../../../assets/data/treatment-phase.data.json';
import { TreatmentPhase, TreatmentPhaseType } from './treatment-phase.model';

export class TreatmentPhaseService {
    public static getTreatmentPhases(): TreatmentPhase[] {
        return treatmentPhaseData as TreatmentPhase[];
    }

    public static getTreatmentPhasesById(phaseId: TreatmentPhaseType): TreatmentPhase {
        return this.getTreatmentPhases().find(phase => phase.id === phaseId);
    }

    public static mapTreatmentPhase(treatmentsPhaseData: string): TreatmentPhase[] {
        const treatmentsPhaseIds = treatmentsPhaseData.split(',');
        return treatmentsPhaseIds.map(phaseId => {
            return this.getTreatmentPhasesById(<TreatmentPhaseType>phaseId);
        });
    }
}
