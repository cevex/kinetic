import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { DatabaseService } from '../../common/database.service';
import { User } from './user.model';

export interface UserUpdateEvent {
    oldList: User[];
    newList: User[];
    updatedEntry: User;
}

@Injectable({
    providedIn: 'root'
})
export class UsersRepository {

    private readonly bddUserKey = 'users';
    private readonly bddSelectedUserKey = 'selected-user';

    constructor(private dataBaseService: DatabaseService) {
    }

    // =======================================================================
    //               Init
    // =======================================================================

    public init() {
    }

    // =======================================================================
    //               Users Access
    // =======================================================================

    public getUsers(): User[] {
        return <User[]>this.dataBaseService.query({
            select: [], // Leave empty to query for all
            order: [{property: 'userProfile.name', direction: 'desc'}],
            limit: 4
        });
    }

    public getUsersById(userId: string): User[] {
        return <User[]>this.dataBaseService.query({
            select: [], // Leave empty to query for all
            where: [{property: 'id', comparison: 'equalTo', value: userId}],
            order: [{property: 'userProfile.name', direction: 'desc'}],
            limit: 4
        });
    }

    // =======================================================================
    //               Mutate
    // =======================================================================

    public updateUser(user: User) {
        this.dataBaseService.updateDocument(user.id, user);
    }

    public createUser(user: User): User {
        const newUser = cloneDeep(user);
        newUser.id = this.dataBaseService.createDocument(user);
        return newUser;
    }

    public deleteUser(user: User) {
        this.dataBaseService.deleteDocument(user.id);
    }
}
