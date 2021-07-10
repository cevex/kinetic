import { Injectable } from '@angular/core';
import { Healthcheck } from '~/app/modules/core/domain/healthcheck/healthcheck-data.model';
import { UsersRepository } from '~/app/modules/core/domain/user/users.repository';
import { HealthcheckDataService } from '../healthcheck/healthcheck-data.service';
import { User, UserProfile } from './user.model';

export interface UserUpdateEvent {
    oldList: User[];
    newList: User[];
    updatedEntry: User;
}

@Injectable({
    providedIn: 'root'
})
export class UsersDataService {

    constructor(
        private userRepository: UsersRepository,
        private healthcheckDataService: HealthcheckDataService
    ) {
    }

    // =======================================================================
    //                Users CREATE
    // =======================================================================

    public createUser(users: User[], userProfile: UserProfile): UserUpdateEvent {
        const userToPersist = this.buildUser(userProfile);
        const newUser = this.userRepository.createUser(userToPersist);
        return {
            oldList: users,
            newList: this.userRepository.getUsers(),
            updatedEntry: newUser
        };
    }

    public buildUser(userProfile: UserProfile): User {
        return {
            userProfile: {
                name: userProfile.name,
                gender: userProfile.gender,
            },
            showGuide: true,
            healthcheckList: [],
            lastVisited: true
        };
    }

    public getDefaultProfile(): UserProfile {
        return {
            name: '',
            gender: 'm',
        };
    }

    // =======================================================================
    //                Users RETRIEVE
    // =======================================================================

    public retrieveUsers(): User[] {
        const users = this.userRepository.getUsers();
        return users ? users : [];
    }

    public retrieveUsersById(userId: string): User[] {
        return this.userRepository.getUsersById(userId);
    }

    // =======================================================================
    //                Users UPDATE
    // =======================================================================

    public updateUserProfile(users: User[], userProfile: UserProfile, userId?: string): UserUpdateEvent {
        const newUser = this.findUserById(users, userId);
        newUser.userProfile = userProfile;
        return this.mergeUser(users, newUser);
    }

    public updateUserHealthcheck(users: User[], user: User, healthcheck: Healthcheck): UserUpdateEvent {
        const newUser = this.findUserById(users, user.id);
        newUser.healthcheckList ?
            newUser.healthcheckList.push(healthcheck) :
            newUser.healthcheckList = [healthcheck];
        return this.mergeUser(users, newUser);
    }

    private mergeUser(users: User[], newUser: User): UserUpdateEvent {
        this.userRepository.updateUser(newUser);
        return {
            oldList: users,
            newList: this.userRepository.getUsers(),
            updatedEntry: newUser
        };
    }

    // =======================================================================
    //                Users DELETE
    // =======================================================================

    public deleteUser(users: User[], userToDelete: User): UserUpdateEvent {
        this.userRepository.deleteUser(userToDelete);
        return {
            oldList: users,
            newList: this.userRepository.getUsers(),
            updatedEntry: userToDelete
        };
    }

    // =======================================================================
    //                User COMPARE
    // =======================================================================

    public equalsId(user1: User, user2: User) {
        return user1.id === user2.id;
    }

    // =======================================================================
    //                User SEARCH
    // =======================================================================

    public findUserById(users: User[], userId: string): User {
        if (!users) return null;
        return users.find(user => user.id === userId);
    }

    // =======================================================================
    //                User SELECTED
    // =======================================================================

    public findSelectedUser(users: User[]) {
        if (!users) return null;
        return users.find(user => user.lastVisited);
    }

    public updatedSelectedUser(users: User[], userId?: string) {
        const alreadySelected = this.findSelectedUser(users);
        if (alreadySelected) {
            alreadySelected.lastVisited = false;
            this.userRepository.updateUser(alreadySelected);
        }

        if (!userId) return;
        const newSelected = users.find(user => user.id === userId);
        if (newSelected) {
            alreadySelected.lastVisited = true;
            this.userRepository.updateUser(newSelected);
        }
    }
}
