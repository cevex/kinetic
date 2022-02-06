import { cloneDeep, last } from 'lodash-es';
import { Healthcheck } from '../../healthcheck/healthcheck.model';
import { TreatmentService } from '../../treatment/treatment.service';
import { PathologySession } from '../session/pathology-session.model';
import { PathologySessionService } from '../session/pathology-session.service';
import { PathologyPhase } from './pathology-phase.model';

export class PathologyPhaseService {
    constructor() {}

    // ===============================================================
    //              Getter
    // ===============================================================

    public static getCurrentSession(pathologyPhase: PathologyPhase): PathologySession {
        return last(pathologyPhase.sessions);
    }

    public static generatePhases(healthcheck: Healthcheck): PathologyPhase[] {
        const treatment = TreatmentService.getTreatmentForHealthcheck(healthcheck);
        return treatment.phases.map(treatmentPhase => {
            return {
                treatmentPhase: treatmentPhase.id,
                sessions: PathologySessionService.generateSessions(treatmentPhase)
            };
        });
    }

    // ===============================================================
    //              Setter
    // ===============================================================

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
