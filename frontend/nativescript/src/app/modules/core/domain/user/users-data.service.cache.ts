import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CacheService } from '../../common/cache/cache.service';
import { DatabaseService } from '../../common/database.service';
import { User } from './user.model';
import { UsersDataService } from './users-data.service';


@Injectable({
    providedIn: 'root'
})
export class UsersDataServiceCache extends CacheService<User[]> {

    constructor(
        private dataBaseService: DatabaseService,
        private usersDataService: UsersDataService
    ) {
        super();
    }

    protected getData(params: any): Observable<User[]> {
        return of(this.usersDataService.readUsers());
    }
}
