export declare type HealthcheckTaskType =
    | 'change-location'
    | 'consult'
    | 'diagnosis'
    | 'exercise'
    | 'pain-choice'
    | 'pain-assessment'
    | 'replug'
    | 'redo'
    | 'test-location';

export interface HealthcheckTask {
    id: string;
    root?: boolean;
    type: HealthcheckTaskType;
}
