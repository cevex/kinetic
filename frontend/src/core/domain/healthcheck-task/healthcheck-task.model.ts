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

// export declare type HealthcheckTaskAny =
//     | TestLocationHealthcheckTask
//     | ChangeLocationHealthcheckTask
//     | ExerciseHealthcheckTask
//     | PainChoiceHealthcheckTask
//     | ConsultHealthcheckTask
//     | DiagnosisHealthcheckTask
//     | RedoHealthcheckTask;

export interface HealthcheckTask {
    id: string;
    root?: boolean;
    type: HealthcheckTaskType;
}
