import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Diagnosis } from './diagnosis.model';

@Injectable({
    providedIn: 'root'
})
export class DiagnosisDataService {

    private DIAGNOSIS_URL = '~/assets/mock/diagnosis.mock.json';

    constructor(private http: HttpClient) {
    }

    public getDiagnosis(): Observable<Diagnosis[]> {
        return this.http.get<Diagnosis[]>(this.DIAGNOSIS_URL);
    }

    public getDiagnosisById(diagnosisId: string): Observable<Diagnosis> {
        return this.getDiagnosis().pipe(
            map(diagnosisList => this.filterById(diagnosisList, diagnosisId)),
        );
    }

    private filterById(diagnosisList: Diagnosis[], diagnosisId): Diagnosis {
        if (!diagnosisList) return null;
        return diagnosisList.find(diagnosis => diagnosis.id === diagnosisId);
    }
}
