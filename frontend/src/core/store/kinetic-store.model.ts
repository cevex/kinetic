import { Healthcheck } from '../domain/healthcheck/healthcheck.model';

export interface KineticStore {
    healthCheck: Healthcheck;
}
