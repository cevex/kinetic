import { cloneDeep, range } from 'lodash-es';
import moment from 'moment';
import { TreatmentPhase } from '../../treatment/phase/treatment-phase.model';
import { PathologySession } from './pathology-session.model';

export class PathologySessionService {
    constructor() {}

    public static generateSessions(phase: TreatmentPhase): PathologySession[] {
        const baseDate = new Date();
        return range(phase.duration).map(index => {
            const date = moment(baseDate).add(index, 'days').toDate();
            return PathologySessionService.buildSession(date);
        });
    }

    public static buildSession(date: Date): PathologySession {
        return {
            date: date,
            doneExercisesId: [],
            evaluations: null
        };
    }

    // =======================================================================
    //               Manage List
    // =======================================================================

    public static setCurrentSession(
        sessions: PathologySession[],
        newSession: PathologySession
    ): PathologySession[] {
        const newSessions = cloneDeep(sessions);
        newSessions.pop();
        newSessions.push(newSession);
        return newSessions;
    }

    static addSession(sessions: PathologySession[], newSession: PathologySession) {
        const newSessions = cloneDeep(sessions);
        newSessions.push(newSession);
        return newSessions;
    }

    // =======================================================================
    //               Exercises
    // =======================================================================

    public static toggleExercises(
        pathologySession: PathologySession,
        exercisesId: string[],
        seen: boolean
    ): PathologySession {
        return exercisesId.reduce((session: PathologySession, exerciseId: string) => {
            return this.toggleExercise(session, exerciseId, seen);
        }, pathologySession);
    }

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

    public static addAllExercises(
        pathologySession: PathologySession,
        exerciseIds: string[]
    ): PathologySession {
        const newSession = cloneDeep(pathologySession);
        newSession.doneExercisesId = exerciseIds;
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
}
