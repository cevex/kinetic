import { TreatmentArea } from '../treatment-area/treatment-area.model';
import { TreatmentPhase } from './phase/treatment-phase.model';

export interface Treatment {
    area: TreatmentArea;
    phasesWorkList: TreatmentPhaseWorkList[];
}

export interface TreatmentPhaseWorkList {
    phase: TreatmentPhase;
    exercisesId: string[];
}
