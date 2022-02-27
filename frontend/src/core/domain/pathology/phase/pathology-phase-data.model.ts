import { TreatmentPhaseType } from '../../treatment/phase/treatment-phase.model';
import { PathologySessionData } from '../session/pathology-session-data.model';

export interface PathologyPhaseData {
    treatmentPhase: TreatmentPhaseType;
    sessions: PathologySessionData[];
}
