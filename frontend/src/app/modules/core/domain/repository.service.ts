import { Injectable } from '@angular/core';
import { DatabaseService } from '../common/database.service';

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
