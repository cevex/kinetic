import { Injectable } from '@angular/core';
import { BodyArea } from '~/app/modules/core/domain/body/body-area-data.model';
import { BodyAreaDataServiceCache } from '~/app/modules/core/domain/body/body-area-data.service.cache';
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
        private bodyAreaDataServiceCache: BodyAreaDataServiceCache,
        private healthcheckDataService: HealthcheckDataService,
        private healthcheckTaskServiceCache: HealthcheckTaskServiceCache
    ) {
    }

    public getPathologies(user: User): Pathology[] {
        return this.bodyAreaDataService.getBodyAreaTypes()
            .map(bodyAreaType => {
                const bodyArea = this.bodyAreaDataServiceCache.findBodyArea(bodyAreaType);
                return <Pathology>{
                    bodyArea: bodyArea,
                    healthcheckList: this.healthcheckDataService.filterByPlace(user.healthcheckList, bodyAreaType),
                    score: 2
                };
            })
            .filter(pathology => pathology.healthcheckList && pathology.healthcheckList.length);

    }



}
