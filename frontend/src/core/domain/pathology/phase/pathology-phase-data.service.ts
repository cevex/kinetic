import { cloneDeep, first, last } from 'lodash-es';
import moment from 'moment';
import { DateTimeService } from '../../../common/date-time.service';
import { Healthcheck } from '../../healthcheck/healthcheck.model';
import { TreatmentService } from '../../treatment/treatment.service';
import { PathologySessionData } from '../session/pathology-session-data.model';
import { PathologySessionDataService } from '../session/pathology-session-data.service';
import { PathologyPhaseData } from './pathology-phase-data.model';

export class PathologyPhaseDataService {
    constructor() {}

    // ===============================================================
    //              Getter
    // ===============================================================

    public static getCurrentSession(pathologyPhase: PathologyPhaseData): PathologySessionData {
        return last(pathologyPhase.sessions);
    }

    public static generatePhases(healthcheck: Healthcheck): PathologyPhaseData[] {
        const treatment = TreatmentService.getTreatmentForHealthcheck(healthcheck);
        let phaseStartDate = DateTimeService.getTodayStart();
        return treatment.phasesWorkList.map(phasesWorkList => {
            const sessions = PathologySessionDataService.generateSessions(
                phasesWorkList.phase,
                phaseStartDate
            );
            phaseStartDate = moment(phaseStartDate).add(sessions.length, 'days').toDate();
            return {
                treatmentPhase: phasesWorkList.phase.id,
                sessions: sessions
            };
        });
    }

    // ===============================================================
    //              Setter
    // ===============================================================

    public static setCurrentPhase(
        pathologyPhase: PathologyPhaseData[],
        newPhase: PathologyPhaseData
    ): PathologyPhaseData[] {
        const newPhases = cloneDeep(pathologyPhase);
        newPhases.pop();
        newPhases.push(newPhase);
        return newPhases;
    }

    public static setCurrentSession(
        pathologyPhase: PathologyPhaseData,
        newSession: PathologySessionData
    ): PathologyPhaseData {
        const newPhase = cloneDeep(pathologyPhase);
        newPhase.sessions = PathologySessionDataService.setCurrentSession(
            pathologyPhase.sessions,
            newSession
        );
        return newPhase;
    }

    // ===============================================================
    //              Find
    // ===============================================================

    public static findTodayPhase(phases: PathologyPhaseData[]): PathologyPhaseData {
        return phases?.find(
            phase => !!PathologySessionDataService.findTodaySession(phase.sessions)
        );
    }

    public static findNextPhase(
        phases: PathologyPhaseData[],
        phaseToCheck: PathologyPhaseData
    ): PathologyPhaseData {
        const indexToCheck = phases?.findIndex(
            phase => phase.treatmentPhase === phaseToCheck.treatmentPhase
        );
        return indexToCheck < phases.length - 1 ? phases[indexToCheck + 1] : phases[indexToCheck];
    }

    public static findPreviousPhase(
        phases: PathologyPhaseData[],
        phaseToCheck: PathologyPhaseData
    ): PathologyPhaseData {
        const indexToCheck = phases?.findIndex(
            phase => phase.treatmentPhase === phaseToCheck.treatmentPhase
        );
        return indexToCheck >= 0 ? phases[indexToCheck - 1] : phases[indexToCheck];
    }

    // ===============================================================
    //              Controls
    // ===============================================================

    public static isFirstPhase(
        phases: PathologyPhaseData[],
        phaseToCheck: PathologyPhaseData
    ): boolean {
        const firstPhase = <PathologyPhaseData>first(phases);
        return firstPhase.treatmentPhase === phaseToCheck.treatmentPhase;
    }

    public static isLastPhase(
        phases: PathologyPhaseData[],
        phaseToCheck: PathologyPhaseData
    ): boolean {
        const lastPhase = <PathologyPhaseData>last(phases);
        return lastPhase.treatmentPhase === phaseToCheck.treatmentPhase;
    }
}
