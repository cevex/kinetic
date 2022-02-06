import { TreatmentPhaseType } from '../../treatment/phase/treatment-phase.model';
import { PathologySession } from '../session/pathology-session.model';

export interface PathologyPhase {
    treatmentPhase: TreatmentPhaseType;
    sessions: PathologySession[];
}
