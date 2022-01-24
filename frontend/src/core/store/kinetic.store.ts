import { combineReducers, createStore, Store } from 'redux';
import { HealthcheckReducer } from './healthcheck/healthcheck.reducer';
import { KineticState } from './kinetic.state';

export class KineticStore {
    private static rootReducer = combineReducers<KineticState>({
        healthcheck: HealthcheckReducer.healthcheckReducer
    });

    public static initStore(): Store {
        return createStore(this.rootReducer);
    }
}
