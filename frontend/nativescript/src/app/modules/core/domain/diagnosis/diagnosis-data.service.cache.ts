import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheService } from '../../common/cache/cache.service';
import { Diagnosis } from './diagnosis.model';
import { DiagnosisDataService } from './diagnosis.service';

@Injectable({
    providedIn: 'root'
})
export class DiagnosisDataServiceCache extends CacheService<Diagnosis[]> {

    constructor(private diagnosisDataService: DiagnosisDataService) {
        super();
    }

    protected getData(): Observable<Diagnosis[]> {
        return this.diagnosisDataService.getDiagnosis();
    }
}
