import { cloneDeep, last } from 'lodash-es';
import { PathologyPhase } from './pathology-phase.model';
import { PathologyPhaseService } from './pathology-phase.service';
import { PathologySession } from './pathology-session.model';
import { Pathology } from './pathology.model';

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
