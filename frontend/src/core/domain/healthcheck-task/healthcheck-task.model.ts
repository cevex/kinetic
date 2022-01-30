import { ChangeLocationHealthcheckTask } from './specific/change-location-healthcheck-task.model';
import { ConsultHealthcheckTask } from './specific/consult-healthcheck-task.model';
import { DiagnosisHealthcheckTask } from './specific/diagnosis-healthcheck-task.model';
import { ExerciseHealthcheckTask } from './specific/exercise-healthcheck-task.model';
import { PainChoiceHealthcheckTask } from './specific/pain-choice-healthcheck-task.model';
import { RedoHealthcheckTask } from './specific/redo-healthcheck-task.model';
import { TestLocationHealthcheckTask } from './specific/test-location-healthcheck-task.model';

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
