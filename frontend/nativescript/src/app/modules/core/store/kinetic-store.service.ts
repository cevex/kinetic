import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BodyAreaDataServiceCache } from '~/app/modules/core/domain/body/body-area-data.service.cache';
import { DiagnosisDataServiceCache } from '~/app/modules/core/domain/diagnosis/diagnosis-data.service.cache';
import { ExerciseDataServiceCache } from '~/app/modules/core/domain/exercices/exercise-data.service.cache';
import { HealthcheckTaskServiceCache } from '~/app/modules/core/domain/healthcheck-task/healthcheck-task-data.service.cache';
import { Healthcheck } from '~/app/modules/core/domain/healthcheck/healthcheck-data.model';
import { User } from '~/app/modules/core/domain/user/user.model';
import { UsersDataService } from '~/app/modules/core/domain/user/users-data.service';
import { KineticStore } from '~/app/modules/core/store/kinetic-store.model';

@Injectable({
    providedIn: 'root'
})
export class KineticStoreService {

    private _store: KineticStore;

    constructor(
        private bodyAreaDataService: BodyAreaDataServiceCache,
        private diagnosisDataService: DiagnosisDataServiceCache,
        private exerciseService: ExerciseDataServiceCache,
        private healthcheckTaskServiceCache: HealthcheckTaskServiceCache,
        private usersDataService: UsersDataService,
    ) {
    }

    public load(): Observable<KineticStore> {
        return forkJoin({
            cache: this.loadCache(),
        }).pipe(
            map(results => {
                this._store = this.initStore();
                return this._store;
            })
        );
    }

    public loadCache(): Observable<void> {
        return forkJoin({
            bodyAreas: this.bodyAreaDataService.get(),
            exercises: this.exerciseService.get(),
            diagnosis: this.diagnosisDataService.get(),
            treatmentTasks: this.healthcheckTaskServiceCache.get(),
        }).pipe(
            map(_ => null)
        );
    }

    public initStore(): KineticStore {
        const users = this.usersDataService.retrieveUsers();
        return {
            users: users,
            selectedUser: this.usersDataService.findSelectedUser(users)
        };
    }

    // =======================================================================
    //                Access store
    // =======================================================================

    public getStore(): KineticStore {
        return this._store;
    }

    public setStore(store: KineticStore) {
        this._store = store;
    }

    // =======================================================================
    //                Sub entry
    // =======================================================================

    public getUsers(): User[] {
        return this._store.users;
    }

    public getSelectedUser(): User {
        return this._store.selectedUser;
    }

    public getCurrentHealthcheck(): Healthcheck {
        return this._store.onGoingHealthcheck;
    }
}
