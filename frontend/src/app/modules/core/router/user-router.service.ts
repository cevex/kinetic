import { Injectable } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { cloneDeep } from 'lodash-es';
import { UsersDataService, UserUpdateEvent } from '~/app/modules/core/domain/user/users-data.service';
import { HealthcheckRouterService } from '~/app/modules/core/router/healthcheck-router.service';
import { KineticStore } from '~/app/modules/core/store/kinetic-store.model';
import { User, UserProfile } from '../domain/user/user.model';
import { KineticStoreService } from '../store/kinetic-store.service';

@Injectable({
    providedIn: 'root'
})
export class UserRouterService {

    public static USER_ROOT = {
        list: 'users',
        home: 'users/home',
        profile: 'users/profile'
    };

    constructor(
        private routerExtensions: RouterExtensions,
        private storeService: KineticStoreService,
        private usersDataService: UsersDataService,
        private healthcheckRouterService: HealthcheckRouterService,
    ) {
    }

    // =======================================================================
    //                Routing
    // =======================================================================

    public rootHome(user: User) {
        user.healthcheckList && user.healthcheckList.length ?
            this.goToUserHome() :
            this.healthcheckRouterService.startHealthcheck();
    }

    public rootUserChoice() {
        if (this.storeService.getSelectedUser()) {
        }
    }

    public goToUserList() {
        this.routerExtensions.navigate([UserRouterService.USER_ROOT.list]);
    }

    public goToUserProfile() {
        this.routerExtensions.navigate([UserRouterService.USER_ROOT.profile]);
    }

    public goToUserHome() {
        this.routerExtensions.navigate([UserRouterService.USER_ROOT.home]);
    }

    // =======================================================================
    //                Actions
    // =======================================================================

    // 1. Get current State
    // 2. Persist in bdd
    // 3. Compute new State
    // 4. Update store reference
    // 5. Navigate

    public selectUser(user: User) {
        const currentState = this.storeService.getStore();
        this.usersDataService.updatedSelectedUser(currentState.users, user.userProfile.id);

        const newState = <KineticStore>cloneDeep(currentState);
        newState.selectedUser = user;
        this.storeService.setStore(newState);

        this.rootHome(user);
    }

    public unselectUser() {
        const currentState = this.storeService.getStore();
        this.usersDataService.updatedSelectedUser(currentState.users);

        const newState = <KineticStore>cloneDeep(currentState);
        newState.selectedUser = null;
        this.storeService.setStore(newState);

        this.goToUserList();
    }

    public createUser(userProfile: UserProfile) {
        const currentState = this.storeService.getStore();
        const newUserEvent = this.usersDataService.createUser(currentState.users, userProfile);
        this.applyInStore(currentState, newUserEvent);

        this.goToUserList();
    }

    public updateUser(userProfile: UserProfile) {
        const currentState = this.storeService.getStore();
        const updatedUserEvent = this.usersDataService.updateUserProfile(currentState.users, userProfile);
        this.applyInStore(currentState, updatedUserEvent);

        this.rootHome(updatedUserEvent.updatedEntry);
    }

    public saveUserHealthcheck() {
        this.healthcheckRouterService.endHealthcheck();

        const currentState = this.storeService.getStore();
        const updatedUserEvent = this.usersDataService.updateUserHealthcheck(currentState.users, currentState.selectedUser,
            currentState.onGoingHealthcheck);
        this.applyInStore(currentState, updatedUserEvent);

        this.rootHome(updatedUserEvent.updatedEntry);
    }


    public deleteUser(user: User) {
        const currentState = this.storeService.getStore();
        const updatedUserEvent = this.usersDataService.deleteUser(currentState.users, user);
        this.applyInStore(currentState, updatedUserEvent);
    }

    // =======================================================================
    //                Store Utils
    // =======================================================================

    private applyInStore(currentState: KineticStore, updateEvent: UserUpdateEvent) {
        const newState = <KineticStore>cloneDeep(currentState);
        newState.users = updateEvent.newList;
        newState.selectedUser = updateEvent.updatedEntry;
        this.storeService.setStore(newState);
    }
}

