import { cloneDeep, range } from 'lodash-es';
import moment from 'moment';
import { DateTimeService } from '../../../common/date-time.service';
import { TreatmentPhase } from '../../treatment/phase/treatment-phase.model';
import { PathologyEvaluationData } from '../evaluation/pathology-evaluation.model';
import { PathologySessionData } from './pathology-session-data.model';

export class PathologySessionDataService {
    constructor() {}

    // =======================================================================
    //               Build
    // =======================================================================

    public static generateSessions(phase: TreatmentPhase, startDate: Date): PathologySessionData[] {
        const baseDate = cloneDeep(startDate);
        return range(phase.duration).map(index => {
            const date = moment(baseDate).add(index, 'days').toDate();
            return PathologySessionDataService.buildSession(date);
        });
    }

    public static buildSession(date: Date): PathologySessionData {
        return {
            dateUTC: date.toUTCString(),
            doneExercisesId: [],
            evaluation: null
        };
    }

    // =======================================================================
    //               Find
    // =======================================================================

    public static findTodaySession(sessions: PathologySessionData[]): PathologySessionData {
        return sessions?.find(session => {
            return DateTimeService.equals(
                new Date(session.dateUTC),
                DateTimeService.getTodayStart()
            );
        });
    }

    // =======================================================================
    //               Manage List
    // =======================================================================

    public static setSession(
        sessions: PathologySessionData[],
        newSession: PathologySessionData
    ): PathologySessionData[] {
        if (!sessions) return [];
        return sessions.map(s => {
            return s.dateUTC === newSession.dateUTC ? newSession : s;
        });
    }

    static addSession(sessions: PathologySessionData[], newSession: PathologySessionData) {
        const newSessions = cloneDeep(sessions);
        newSessions.push(newSession);
        return newSessions;
    }

    // =======================================================================
    //               Exercises
    // =======================================================================

    public static toggleExercise(
        pathologySession: PathologySessionData,
        exerciseId: string
    ): PathologySessionData {
        const alreadySeen = pathologySession.doneExercisesId.some(id => id === exerciseId);
        const doneExercisesId = !alreadySeen
            ? [...pathologySession.doneExercisesId, exerciseId]
            : pathologySession.doneExercisesId.filter(doneExercise => doneExercise !== exerciseId);
        return { ...pathologySession, doneExercisesId };
    }

    public static addAllExercises(
        pathologySession: PathologySessionData,
        exerciseIds: string[]
    ): PathologySessionData {
        const alreadySeen = exerciseIds.length === pathologySession.doneExercisesId.length;
        return { ...pathologySession, doneExercisesId: alreadySeen ? [] : exerciseIds };
    }

    public static setEvaluation(
        pathologySession: PathologySessionData,
        evaluation: PathologyEvaluationData
    ): PathologySessionData {
        return { ...pathologySession, evaluation: evaluation };
    }
}
