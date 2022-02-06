import { TreatmentArea } from '../treatment-area/treatment-area.model';
import { TreatmentPhase } from './phase/treatment-phase.model';

export interface Treatment {
    area: TreatmentArea;
    phases: TreatmentPhase[];
}
