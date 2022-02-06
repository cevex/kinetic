import { Healthcheck } from '../healthcheck/healthcheck.model';
import { PathologyPhase } from './phase/pathology-phase.model';

export interface Pathology {
    originalHealthcheck: Healthcheck;
    phases: PathologyPhase[];
}
