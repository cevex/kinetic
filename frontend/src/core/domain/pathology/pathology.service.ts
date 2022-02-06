import { cloneDeep, last, range } from 'lodash-es';
import moment from 'moment';
import { Healthcheck } from '../healthcheck/healthcheck.model';
import { HealthcheckService } from '../healthcheck/healthcheck.service';
import { TreatmentPhase, TreatmentPhaseType } from '../treatment/phase/treatment-phase.model';
import { Treatment } from '../treatment/treatment.model';
import { TreatmentService } from '../treatment/treatment.service';
import { PathologyPhase } from './phase/pathology-phase.model';
import { PathologyPhaseService } from './phase/pathology-phase.service';
import { PathologySession } from './session/pathology-session.model';
import { Pathology } from './pathology.model';
import { PathologySessionService } from './session/pathology-session.service';

export class PathologyService {
    constructor() {}

    // ===============================================================
    //              Reader
    // ===============================================================

    public static getCurrentPhase(pathology: Pathology): PathologyPhase {
        return last(pathology.phases);
    }

    public static getCurrentSession(pathology: Pathology): PathologySession {
        const currentPhase = PathologyService.getCurrentPhase(pathology);
        return PathologyPhaseService.getCurrentSession(currentPhase);
    }

    // ===============================================================
    //              Setter
    // ===============================================================

    public static setCurrentSession(pathology: Pathology, newSession: PathologySession): Pathology {
        const newPathology = cloneDeep(pathology);
        const currentPhase = this.getCurrentPhase(pathology);

        const newPhase = PathologyPhaseService.setCurrentSession(currentPhase, newSession);
        newPathology.phases = PathologyPhaseService.setCurrentPhase(pathology.phases, newPhase);
        return newPathology;
    }
}
