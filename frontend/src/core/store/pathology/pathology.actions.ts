import { Healthcheck } from '../../domain/healthcheck/healthcheck.model';
import { PathologyEvaluationData } from '../../domain/pathology/evaluation/pathology-evaluation.model';
import { PathologySessionData } from '../../domain/pathology/session/pathology-session-data.model';

// =======================================================================
//               Actions
// =======================================================================

export declare type PathologyActionType =
    | 'START_PATHOLOGY'
    | 'MARK_EXERCISE_SEEN'
    | 'MARK_ALL_EXERCISES_SEEN'
    | 'EVALUATE_SESSION'
    | 'END_SESSION';

export interface PathologyAction {
    type: PathologyActionType;
}

export interface StartPathologyAction extends PathologyAction {
    type: 'START_PATHOLOGY';
    healthcheck: Healthcheck;
}

export interface MarkAllExerciseAsSeenAction extends PathologyAction {
    type: 'MARK_ALL_EXERCISES_SEEN';
    session: PathologySessionData;
    exercisesIds: string[];
}

export interface MarkExerciseAsSeenAction extends PathologyAction {
    type: 'MARK_EXERCISE_SEEN';
    session: PathologySessionData;
    exercisesId: string;
    seen?: boolean;
}

export interface EvaluateSessionAction extends PathologyAction {
    type: 'EVALUATE_SESSION';
    session: PathologySessionData;
    evaluation: PathologyEvaluationData;
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

    public static markAllExerciseAsSeen = (
        session: PathologySessionData,
        exercisesId: string[]
    ): MarkAllExerciseAsSeenAction => {
        return {
            type: 'MARK_ALL_EXERCISES_SEEN',
            session: session,
            exercisesIds: exercisesId
        };
    };

    public static markExerciseAsSeen = (
        session: PathologySessionData,
        exercisesId: string
    ): MarkExerciseAsSeenAction => {
        return {
            type: 'MARK_EXERCISE_SEEN',
            session: session,
            exercisesId: exercisesId
        };
    };

    public static evaluateSession = (
        session: PathologySessionData,
        evaluation: PathologyEvaluationData
    ): EvaluateSessionAction => {
        return { type: 'EVALUATE_SESSION', session: session, evaluation: evaluation };
    };
}
