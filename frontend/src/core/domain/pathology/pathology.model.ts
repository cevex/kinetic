import { Healthcheck } from '../healthcheck/healthcheck.model';
import { PathologyPhaseData } from './phase/pathology-phase-data.model';

export interface Pathology {
    originalHealthcheck: Healthcheck;
    phases: PathologyPhaseData[];
}
