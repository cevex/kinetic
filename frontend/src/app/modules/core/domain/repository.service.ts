import { Injectable } from '@angular/core';
import { DatabaseService } from '../common/database.service';
import { UsersRepository } from './user/users.repository';

@Injectable({
    providedIn: 'root'
})
export class RepositoryService {

    constructor(
        private dataBaseService: DatabaseService
    ) {
    }

    public init() {
        this.dataBaseService.init();
    }
}
