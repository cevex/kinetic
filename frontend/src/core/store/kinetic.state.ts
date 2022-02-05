import { Healthcheck } from '../domain/healthcheck/healthcheck.model';
import { Pathology } from '../domain/pathology/pathology.model';

export interface KineticState {
    onGoingHealthcheck: Healthcheck;
    pathology: Pathology;
}
