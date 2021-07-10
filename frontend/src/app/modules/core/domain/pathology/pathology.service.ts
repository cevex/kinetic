import { Injectable } from '@angular/core';
import { BodyAreaDataService } from '../body/body-area-data.service';
import { HealthcheckTaskServiceCache } from '../healthcheck-task/healthcheck-task-data.service.cache';
import { HealthcheckDataService } from '../healthcheck/healthcheck-data.service';
import { User } from '../user/user.model';
import { Pathology } from './pathology.model';

@Injectable({
    providedIn: 'root'
})
export class PathologyService {

    constructor(
        private bodyAreaDataService: BodyAreaDataService,
        private healthcheckDataService: HealthcheckDataService,
        private healthcheckTaskServiceCache: HealthcheckTaskServiceCache
    ) {
    }

    public getPathologies(user: User): Pathology[] {
        return this.bodyAreaDataService.getBodyArea()
            .map(bodyArea => {
                return <Pathology>{
                    bodyArea: bodyArea,
                    healthcheckList: this.healthcheckDataService.filterByPlace(user.healthcheckList, bodyArea),
                    score: 2
                };
            })
            .filter(pathology => pathology.healthcheckList && pathology.healthcheckList.length);

    }

}
