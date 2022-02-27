import { cloneDeep, last, range } from 'lodash-es';
import moment from 'moment';
import { Healthcheck } from '../healthcheck/healthcheck.model';
import { HealthcheckService } from '../healthcheck/healthcheck.service';
import { TreatmentPhase, TreatmentPhaseType } from '../treatment/phase/treatment-phase.model';
import { Treatment } from '../treatment/treatment.model';
import { TreatmentService } from '../treatment/treatment.service';
import { PathologyPhaseData } from './phase/pathology-phase-data.model';
import { PathologyPhaseDataService } from './phase/pathology-phase-data.service';
import { PathologySessionData } from './session/pathology-session-data.model';
import { Pathology } from './pathology.model';
import { PathologySessionDataService } from './session/pathology-session-data.service';

export class PathologyService {
    constructor() {}

    // ===============================================================
    //              Reader
    // ===============================================================

    public static getCurrentPhase(pathology: Pathology): PathologyPhaseData {
        return last(pathology.phases);
    }

    public static getCurrentSession(pathology: Pathology): PathologySessionData {
        const currentPhase = PathologyService.getCurrentPhase(pathology);
        return PathologyPhaseDataService.getCurrentSession(currentPhase);
    }

    // ===============================================================
    //              Setter
    // ===============================================================

    public static setCurrentSession(
        pathology: Pathology,
        newSession: PathologySessionData
    ): Pathology {
        const newPathology = cloneDeep(pathology);
        const currentPhase = this.getCurrentPhase(pathology);

        const newPhase = PathologyPhaseDataService.setCurrentSession(currentPhase, newSession);
        newPathology.phases = PathologyPhaseDataService.setCurrentPhase(pathology.phases, newPhase);
        return newPathology;
    }
}
