import { TreatmentPhase } from '../treatment/treatment.model';
import { PathologySession } from './pathology-session.model';

export interface PathologyPhase {
    treatmentPhase: TreatmentPhase;
    sessions: PathologySession[];
}
