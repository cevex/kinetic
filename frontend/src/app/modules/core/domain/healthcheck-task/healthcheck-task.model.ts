export declare type HealthcheckTaskType =
    'exercise' |
    'diagnosis' |
    'consult' |
    'replug' |
    'redo' |
    'test-location' |
    'change-location' |
    'pain-assessment';

export class HealthcheckTask {
    id: string;
    root?: boolean;
    type: HealthcheckTaskType;
}
