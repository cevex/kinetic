import { PainAssessChoiceTripleType } from '../../domain/healthcheck-task/choice/pain-assessment-choice.model';
import { Healthcheck } from '../../domain/healthcheck/healthcheck.model';
import { PathologyEvaluationFeeling } from '../../domain/pathology/pathology-evaluation.model';

// =======================================================================
//               Actions
// =======================================================================

export declare type PathologyActionType =
    | 'START_PATHOLOGY'
    | 'MARK_EXERCISE_SEEN'
    | 'MARK_ALL_EXERCISES_SEEN'
    | 'EVALUATE_FEELING_SESSION'
    | 'EVALUATE_GLOBAL_SESSION'
    | 'END_SESSION';

export interface PathologyAction {
    type: PathologyActionType;
}

export interface StartPathologyAction extends PathologyAction {
    type: 'START_PATHOLOGY';
    healthcheck: Healthcheck;
}

export interface MarkExerciseAsSeenAction extends PathologyAction {
    type: 'MARK_EXERCISE_SEEN';
    exerciseId: string;
    seen: boolean;
}

export interface MarkAllExerciseAsSeenAction extends PathologyAction {
    type: 'MARK_ALL_EXERCISES_SEEN';
    seen: boolean;
}

export interface EvaluateFeelingSessionAction extends PathologyAction {
    type: 'EVALUATE_FEELING_SESSION';
    evaluationFeeling: PathologyEvaluationFeeling;
}

export interface EvaluateGlobalSessionAction extends PathologyAction {
    type: 'EVALUATE_GLOBAL_SESSION';
    globalAssessment: PainAssessChoiceTripleType;
}

export interface EndSessionAction extends PathologyAction {
    type: 'END_SESSION';
}

// =======================================================================
//               Actionner
// =======================================================================

export class PathologyActionner {
    public static startPathology(healthcheck: Healthcheck): StartPathologyAction {
        return { type: 'START_PATHOLOGY', healthcheck: healthcheck };
    }

    public static markExerciseAsSeen = (
        exerciseId: string,
        seen: boolean
    ): MarkExerciseAsSeenAction => {
        return { type: 'MARK_EXERCISE_SEEN', exerciseId: exerciseId, seen: seen };
    };

    public static markAllExercisesAsSeen = (seen: boolean): MarkAllExerciseAsSeenAction => {
        return { type: 'MARK_ALL_EXERCISES_SEEN', seen: seen };
    };

    public static evaluateFeelingSession = (
        evaluationFeeling: PathologyEvaluationFeeling
    ): EvaluateFeelingSessionAction => {
        return { type: 'EVALUATE_FEELING_SESSION', evaluationFeeling: evaluationFeeling };
    };

    public static evaluateGlobalSession = (
        globalAssessment: PainAssessChoiceTripleType
    ): EvaluateGlobalSessionAction => {
        return { type: 'EVALUATE_GLOBAL_SESSION', globalAssessment: globalAssessment };
    };
}
