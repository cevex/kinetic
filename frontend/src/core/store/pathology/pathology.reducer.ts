import { cloneDeep } from 'lodash-es';
import { PainAssessChoiceTripleType } from '../../domain/healthcheck-task/choice/pain-assessment-choice.model';
import { Healthcheck } from '../../domain/healthcheck/healthcheck.model';
import { PathologyEvaluationFeeling } from '../../domain/pathology/pathology-evaluation.model';
import { PathologySessionService } from '../../domain/pathology/pathology-session.service';
import { Pathology } from '../../domain/pathology/pathology.model';
import { PathologyService } from '../../domain/pathology/pathology.service';
import {
    EvaluateFeelingSessionAction,
    EvaluateGlobalSessionAction,
    MarkAllExerciseAsSeenAction,
    MarkExerciseAsSeenAction,
    PathologyAction,
    StartPathologyAction
} from './pathology.actions';

export class PathologyReducer {
    private static initialState: Pathology = {
        originalHealthcheck: null,
        phases: [
            {
                treatmentPhase: 'inflammatoire',
                sessions: []
            }
        ]
    };

    constructor() {}

    // =======================================================================
    //               REDUCER
    // =======================================================================

    public static pathologyReducer = (
        state = this.initialState,
        action: PathologyAction
    ): Pathology => {
        switch (action.type) {
            case 'START_PATHOLOGY':
                return this.startPathology(state, (<StartPathologyAction>action).healthcheck);
            case 'MARK_EXERCISE_SEEN':
                const seenAction = <MarkExerciseAsSeenAction>action;
                return this.markExerciseAsSeen(state, seenAction.exerciseId, seenAction.seen);
            case 'MARK_ALL_EXERCISES_SEEN':
                const seenAllAction = <MarkAllExerciseAsSeenAction>action;
                return this.markAllExercisesAsSeen(state, seenAllAction.seen);
            case 'EVALUATE_FEELING_SESSION':
                return this.evaluateFeelingSession(
                    state,
                    (<EvaluateFeelingSessionAction>action).evaluationFeeling
                );
            case 'EVALUATE_GLOBAL_SESSION':
                return this.evaluateGlobalSession(
                    state,
                    (<EvaluateGlobalSessionAction>action).globalAssessment
                );
            default:
                return state;
        }
    };

    public static startPathology(pathology: Pathology, healthcheck: Healthcheck): Pathology {
        const newPathology = cloneDeep(pathology);
        newPathology.originalHealthcheck = healthcheck;
        return newPathology;
    }

    public static markExerciseAsSeen(
        pathology: Pathology,
        exerciseId: string,
        seen: boolean
    ): Pathology {
        const currentSession = PathologyService.getCurrentSession(pathology);
        const newSession = PathologySessionService.toggleExercise(currentSession, exerciseId, seen);
        return PathologyService.setCurrentSession(pathology, newSession);
    }

    public static markAllExercisesAsSeen(pathology: Pathology, seen: boolean): Pathology {
        // const currentSession = PathologyService.getCurrentSession(pathology);
        // const newSession = PathologySessionService.toggleExercise(currentSession, exerciseId, seen);
        // return PathologyService.setCurrentSession(pathology, newSession);
        return pathology;
    }

    public static evaluateFeelingSession(
        pathology: Pathology,
        evaluationFeeling: PathologyEvaluationFeeling
    ): Pathology {
        return pathology;
    }

    public static evaluateGlobalSession(
        pathology: Pathology,
        globalAssessment: PainAssessChoiceTripleType
    ): Pathology {
        return pathology;
    }
}
