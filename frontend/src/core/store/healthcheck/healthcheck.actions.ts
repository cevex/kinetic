import { BodyAreaType } from '../../domain/body/body-area-data.model';
import { PainAssessChoiceTripleType } from '../../domain/healthcheck-task/choice/pain-assessment-choice.model';

// =======================================================================
//               Actions
// =======================================================================

export declare type HealthcheckActionType =
    | 'START_HEALTHCHECK'
    | 'CHOOSE_LOCATION'
    | 'SEE_DISCLAIMER'
    | 'ASSESS_EXERCISE'
    | 'REDO_EXERCISE'
    | 'END_HEALTHCHECK';

export interface HealthcheckAction {
    type: HealthcheckActionType;
}

export interface StartHealthcheckAction extends HealthcheckAction {
    type: 'START_HEALTHCHECK';
}

export interface SeeDisclaimerAction extends HealthcheckAction {
    type: 'SEE_DISCLAIMER';
}

export interface ChooseLocationAction extends HealthcheckAction {
    type: 'CHOOSE_LOCATION';
    bodyAreas: BodyAreaType[];
}

export interface AssessExerciseAction extends HealthcheckAction {
    type: 'ASSESS_EXERCISE';
    choiceType: PainAssessChoiceTripleType;
}

export interface RedoExerciseAction extends HealthcheckAction {
    type: 'REDO_EXERCISE';
}

export interface EndHealthcheckAction extends HealthcheckAction {
    type: 'END_HEALTHCHECK';
}

// =======================================================================
//               Actionner
// =======================================================================

export class HealthcheckActionner {
    public static startHealthcheck(): StartHealthcheckAction {
        return { type: 'START_HEALTHCHECK' };
    }

    public static chooseLocation = (bodyAreas: BodyAreaType[]): ChooseLocationAction => {
        return { type: 'CHOOSE_LOCATION', bodyAreas: bodyAreas };
    };

    public static seeDisclaimer = (): SeeDisclaimerAction => {
        return { type: 'SEE_DISCLAIMER' };
    };

    public static assessExercise = (
        choiceType: PainAssessChoiceTripleType
    ): AssessExerciseAction => {
        return { type: 'ASSESS_EXERCISE', choiceType: choiceType };
    };

    public static redoExercise = (): RedoExerciseAction => {
        return { type: 'REDO_EXERCISE' };
    };

    public static endHealthcheck = (): EndHealthcheckAction => {
        return { type: 'END_HEALTHCHECK' };
    };
}
