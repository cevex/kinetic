import { cloneDeep, first, last } from 'lodash-es';
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
        return treatment.phasesWorkList.map(phasesWorkList => {
            return {
                treatmentPhase: phasesWorkList.phase.id,
                sessions: PathologySessionDataService.generateSessions(phasesWorkList.phase)
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
