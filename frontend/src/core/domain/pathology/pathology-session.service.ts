import { cloneDeep } from 'lodash-es';
import { PathologySession } from './pathology-session.model';

export class PathologySessionService {
    constructor() {}

    public static toggleExercise(
        pathologySession: PathologySession,
        exerciseId: string,
        seen: boolean
    ): PathologySession {
        const newSession = cloneDeep(pathologySession);
        newSession.doneExercisesId = seen
            ? [...pathologySession.doneExercisesId, exerciseId]
            : pathologySession.doneExercisesId.filter(doneExercise => doneExercise !== exerciseId);
        return newSession;
    }

    public static clearExercises(pathologySession: PathologySession): PathologySession {
        const newSession = cloneDeep(pathologySession);
        newSession.doneExercisesId = [];
        return newSession;
    }

    public static setExercises(
        pathologySession: PathologySession,
        exerciseIds: string[]
    ): PathologySession {
        const newSession = cloneDeep(pathologySession);
        newSession.doneExercisesId = exerciseIds;
        return newSession;
    }

    public static setCurrentSession(
        pathologySessions: PathologySession[],
        newSession: PathologySession
    ): PathologySession[] {
        const newSessions = cloneDeep(pathologySessions);
        newSessions.pop();
        newSessions.push(newSession);
        return newSessions;
    }
}
