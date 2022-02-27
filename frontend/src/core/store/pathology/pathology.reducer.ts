import { cloneDeep } from 'lodash-es';
import { Healthcheck } from '../../domain/healthcheck/healthcheck.model';
import { Pathology } from '../../domain/pathology/pathology.model';
import { PathologyService } from '../../domain/pathology/pathology.service';
import { PathologyPhaseDataService } from '../../domain/pathology/phase/pathology-phase-data.service';
import { PathologySessionDataService } from '../../domain/pathology/session/pathology-session-data.service';
import {
    EvaluateFeelingSessionAction,
    EvaluateGlobalSessionAction,
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
                return this.markExerciseAsSeen(state, <MarkExerciseAsSeenAction>action);
            case 'EVALUATE_FEELING_SESSION':
                return this.evaluateFeelingSession(state, <EvaluateFeelingSessionAction>action);
            case 'EVALUATE_GLOBAL_SESSION':
                return this.evaluateGlobalSession(state, <EvaluateGlobalSessionAction>action);
            default:
                return state;
        }
    };

    public static startPathology(pathology: Pathology, healthcheck: Healthcheck): Pathology {
        console.log('[PathologyReducer] => startPathology', healthcheck);
        const newPathology = cloneDeep(pathology);
        newPathology.originalHealthcheck = healthcheck;
        newPathology.phases = PathologyPhaseDataService.generatePhases(healthcheck);
        return newPathology;
    }

    public static markExerciseAsSeen(
        pathology: Pathology,
        action: MarkExerciseAsSeenAction
    ): Pathology {
        const currentSession = PathologyService.getCurrentSession(pathology);
        const newSession = PathologySessionDataService.toggleExercises(
            currentSession,
            action.exercisesId,
            action.seen
        );
        return PathologyService.setCurrentSession(pathology, newSession);
    }

    public static evaluateFeelingSession(
        pathology: Pathology,
        action: EvaluateFeelingSessionAction
    ): Pathology {
        return pathology;
    }

    public static evaluateGlobalSession(
        pathology: Pathology,
        action: EvaluateGlobalSessionAction
    ): Pathology {
        // action.globalAssessment
        return pathology;
    }
}
