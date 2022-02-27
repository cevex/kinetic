import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { HealthcheckReducer } from './healthcheck/healthcheck.reducer';
import { KineticState } from './kinetic.state';
import { PathologyReducer } from './pathology/pathology.reducer';

export class KineticStore {
    private static rootPersistConfig = {
        key: 'root',
        storage: AsyncStorage
    };

    private static rootReducer = combineReducers<KineticState>({
        onGoingHealthcheck: HealthcheckReducer.healthcheckReducer,
        pathology: PathologyReducer.pathologyReducer
    });

    private static persistReducer = persistReducer(this.rootPersistConfig, this.rootReducer);

    public static store = createStore(this.persistReducer);
    public static persistor = persistStore(this.store);
}
