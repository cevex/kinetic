import { Healthcheck } from '../healthcheck/healthcheck.model';
import { PathologyPhase } from './pathology-phase.model';

export interface Pathology {
    originalHealthcheck: Healthcheck;
    phases: PathologyPhase[];
}
