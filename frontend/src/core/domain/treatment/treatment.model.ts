export declare type TreatmentPhase = 'inflammatoire' | 'consolidation' | 'entretien' | 'mobilite';

export interface Treatment {
    area: string;
    exercise: string;
    phases: TreatmentPhase[];
}

export interface TreatmentArea {
    id: string;
    name: string;
}
