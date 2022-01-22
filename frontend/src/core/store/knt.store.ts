import { KineticStore } from './kinetic-store.model';

export class KntStore {
    private static _store: KineticStore;

    constructor() {}

    public static initStore() {
        this._store = {
            healthCheck: null
        };
    }

    public static read(): KineticStore {
        return this._store;
    }
}
