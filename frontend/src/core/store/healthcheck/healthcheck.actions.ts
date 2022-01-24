import { PainAreaChoice } from '../../domain/healthcheck-task/choice/pain-area-choice.model';
import { PainAssessChoiceTripleType } from '../../domain/healthcheck-task/choice/pain-assessment-choice.model';

export declare type HealthcheckActionType =
    | 'SEE_GUIDE'
    | 'CHOOSE_LOCATION'
    | 'ASSESS_EXERCISE'
    | 'VALIDATE_EXERCISE'
    | 'END_HEALTHCHECK'
    | 'REDO_EXERCISE';

export interface HealthcheckAction {
    type: HealthcheckActionType;
}

export interface SeeHealthcheckGuideAction extends HealthcheckAction {
    type: 'SEE_GUIDE';
}

export interface ChooseLocationAction extends HealthcheckAction {
    type: 'CHOOSE_LOCATION';
    choice: PainAreaChoice;
}

export interface AssessExerciseAction extends HealthcheckAction {
    type: 'ASSESS_EXERCISE';
    choiceType: PainAssessChoiceTripleType;
}

export interface EndHealthcheckAction extends HealthcheckAction {
    type: 'CHOOSE_LOCATION';
    endTaskId: string;
}
