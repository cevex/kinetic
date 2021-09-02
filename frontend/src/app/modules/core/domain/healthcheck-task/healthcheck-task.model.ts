export declare type HealthcheckTaskType =
    'change-location' |
    'consult' |
    'diagnosis' |
    'exercise' |
    'pain-choice' |
    'pain-assessment' |
    'replug' |
    'redo' |
    'test-location';

export class HealthcheckTask {
    id: string;
    root?: boolean;
    type: HealthcheckTaskType;
}
