import { cloneDeep, range } from 'lodash-es';
import moment from 'moment';
import { DateTimeService } from '../../../common/date-time.service';
import { TreatmentPhase } from '../../treatment/phase/treatment-phase.model';
import { PathologySessionData } from './pathology-session-data.model';

export class PathologySessionDataService {
    constructor() {}

    // =======================================================================
    //               Build
    // =======================================================================

    public static generateSessions(phase: TreatmentPhase): PathologySessionData[] {
        const baseDate = new Date();
        return range(phase.duration).map(index => {
            const date = moment(baseDate).add(index, 'days').toDate();
            return PathologySessionDataService.buildSession(date);
        });
    }

    public static buildSession(date: Date): PathologySessionData {
        return {
            date: date,
            doneExercisesId: [],
            evaluation: null
        };
    }

    // =======================================================================
    //               Find
    // =======================================================================

    public static findTodaySession(sessions: PathologySessionData[]): PathologySessionData {
        return sessions?.find(session =>
            DateTimeService.equals(session.date, DateTimeService.getNow())
        );
    }

    // =======================================================================
    //               Manage List
    // =======================================================================

    public static setCurrentSession(
        sessions: PathologySessionData[],
        newSession: PathologySessionData
    ): PathologySessionData[] {
        const newSessions = cloneDeep(sessions);
        newSessions.pop();
        newSessions.push(newSession);
        return newSessions;
    }

    static addSession(sessions: PathologySessionData[], newSession: PathologySessionData) {
        const newSessions = cloneDeep(sessions);
        newSessions.push(newSession);
        return newSessions;
    }

    // =======================================================================
    //               Exercises
    // =======================================================================

    public static toggleExercises(
        pathologySession: PathologySessionData,
        exercisesId: string[],
        seen: boolean
    ): PathologySessionData {
        return exercisesId.reduce((session: PathologySessionData, exerciseId: string) => {
            return this.toggleExercise(session, exerciseId, seen);
        }, pathologySession);
    }

    public static toggleExercise(
        pathologySession: PathologySessionData,
        exerciseId: string,
        seen: boolean
    ): PathologySessionData {
        const newSession = cloneDeep(pathologySession);
        newSession.doneExercisesId = seen
            ? [...pathologySession.doneExercisesId, exerciseId]
            : pathologySession.doneExercisesId.filter(doneExercise => doneExercise !== exerciseId);
        return newSession;
    }

    public static addAllExercises(
        pathologySession: PathologySessionData,
        exerciseIds: string[]
    ): PathologySessionData {
        const newSession = cloneDeep(pathologySession);
        newSession.doneExercisesId = exerciseIds;
        return newSession;
    }

    public static clearExercises(pathologySession: PathologySessionData): PathologySessionData {
        const newSession = cloneDeep(pathologySession);
        newSession.doneExercisesId = [];
        return newSession;
    }

    public static setExercises(
        pathologySession: PathologySessionData,
        exerciseIds: string[]
    ): PathologySessionData {
        const newSession = cloneDeep(pathologySession);
        newSession.doneExercisesId = exerciseIds;
        return newSession;
    }
}
