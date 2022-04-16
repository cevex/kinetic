import { cloneDeep, last } from 'lodash-es';
import { Pathology } from './pathology.model';
import { PathologyPhaseData } from './phase/pathology-phase-data.model';
import { PathologyPhaseDataService } from './phase/pathology-phase-data.service';
import { PathologySessionData } from './session/pathology-session-data.model';

export class PathologyService {
    constructor() {}

    // ===============================================================
    //              Reader
    // ===============================================================

    public static getCurrentPhase(pathology: Pathology): PathologyPhaseData {
        return last(pathology.phases);
    }

    // ===============================================================
    //              Setter
    // ===============================================================

    public static setSession(pathology: Pathology, newSession: PathologySessionData): Pathology {
        const phaseToUpdate = PathologyPhaseDataService.findPhaseBySession(
            pathology.phases,
            newSession
        );

        const newPhase = PathologyPhaseDataService.setSession(phaseToUpdate, newSession);
        const newPathology = cloneDeep(pathology);
        newPathology.phases = PathologyPhaseDataService.setPhase(pathology.phases, newPhase);
        return newPathology;
    }
}
