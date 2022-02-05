import { cloneDeep, last } from 'lodash-es';
import { PathologyPhase } from './pathology-phase.model';
import { PathologySession } from './pathology-session.model';
import { PathologySessionService } from './pathology-session.service';

export class PathologyPhaseService {
    constructor() {}

    public static getCurrentSession(pathologyPhase: PathologyPhase): PathologySession {
        return last(pathologyPhase.sessions);
    }

    public static setCurrentPhase(
        pathologyPhase: PathologyPhase[],
        newPhase: PathologyPhase
    ): PathologyPhase[] {
        const newPhases = cloneDeep(pathologyPhase);
        newPhases.pop();
        newPhases.push(newPhase);
        return newPhases;
    }

    public static setCurrentSession(
        pathologyPhase: PathologyPhase,
        newSession: PathologySession
    ): PathologyPhase {
        const newPhase = cloneDeep(pathologyPhase);
        newPhase.sessions = PathologySessionService.setCurrentSession(
            pathologyPhase.sessions,
            newSession
        );
        return newPhase;
    }
}
