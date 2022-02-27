export declare type TreatmentPhaseType =
    | 'inflammatoire'
    | 'consolidation'
    | 'entretien'
    | 'mobilite';

export interface TreatmentPhase {
    id: TreatmentPhaseType;
    name: string;
    duration: number;
}
