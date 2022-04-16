import { cloneDeep } from 'lodash-es';
import { Healthcheck } from '../../domain/healthcheck/healthcheck.model';
import { Pathology } from '../../domain/pathology/pathology.model';
import { PathologyService } from '../../domain/pathology/pathology.service';
import { PathologyPhaseDataService } from '../../domain/pathology/phase/pathology-phase-data.service';
import { PathologySessionDataService } from '../../domain/pathology/session/pathology-session-data.service';
import {
    EvaluateSessionAction,
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
            case 'MARK_ALL_EXERCISES_SEEN':
                return this.markAllExerciseAsSeen(state, <MarkAllExerciseAsSeenAction>action);
            case 'MARK_EXERCISE_SEEN':
                return this.markExerciseAsSeen(state, <MarkExerciseAsSeenAction>action);
            case 'EVALUATE_SESSION':
                return this.evaluateSession(state, <EvaluateSessionAction>action);
            default:
                return state;
        }
    };

    public static startPathology(pathology: Pathology, healthcheck: Healthcheck): Pathology {
        const newPathology = cloneDeep(pathology);
        newPathology.originalHealthcheck = healthcheck;
        newPathology.phases = PathologyPhaseDataService.generatePhases(healthcheck);
        return newPathology;
    }

    public static markAllExerciseAsSeen(
        pathology: Pathology,
        action: MarkAllExerciseAsSeenAction
    ): Pathology {
        const newSession = PathologySessionDataService.addAllExercises(
            action.session,
            action.exercisesIds
        );
        return PathologyService.setSession(pathology, newSession);
    }

    public static markExerciseAsSeen(
        pathology: Pathology,
        action: MarkExerciseAsSeenAction
    ): Pathology {
        const newSession = PathologySessionDataService.toggleExercise(
            action.session,
            action.exercisesId
        );
        return PathologyService.setSession(pathology, newSession);
    }

    public static evaluateSession(pathology: Pathology, action: EvaluateSessionAction): Pathology {
        const newSession = PathologySessionDataService.setEvaluation(
            action.session,
            action.evaluation
        );
        return PathologyService.setSession(pathology, newSession);
    }
}
