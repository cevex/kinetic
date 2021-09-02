import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HealthcheckTask } from '~/app/modules/core/domain/healthcheck-task/healthcheck-task.model';
import { CacheService } from '../../common/cache/cache.service';
import { BodyArea } from './body-area-data.model';
import { BodyAreaDataService } from './body-area-data.service';

@Injectable({
    providedIn: 'root'
})
export class BodyAreaDataServiceCache extends CacheService<BodyArea[]> {

    constructor(private bodyAreaDataService: BodyAreaDataService) {
        super();
    }

    protected getData(): Observable<BodyArea[]> {
        return this.bodyAreaDataService.getBodyAreas();
    }

    public findBodyArea(type: string): BodyArea {
        return this.getFlat().find(bodyArea => bodyArea.type === type);
    }

}
