import { combineReducers, createStore, Store } from 'redux';
import { HealthcheckReducer } from './healthcheck/healthcheck.reducer';
import { KineticState } from './kinetic.state';
import { PathologyReducer } from './pathology/pathology.reducer';

export class KineticStore {
    private static rootReducer = combineReducers<KineticState>({
        onGoingHealthcheck: HealthcheckReducer.healthcheckReducer,
        pathology: PathologyReducer.pathologyReducer
    });

    public static initStore(): Store<KineticState> {
        return createStore(this.rootReducer);
    }
}
