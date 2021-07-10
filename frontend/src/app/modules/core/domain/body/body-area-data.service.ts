import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BodyArea, BodyAreaPlace, BodyAreaType } from './body-area-data.model';

@Injectable({
    providedIn: 'root'
})
export class BodyAreaDataService {

    private BODY_AREA_URL = '~/assets/mock/body-area.mock.json';

    constructor(private http: HttpClient) {
    }

    public getBodyAreas(): Observable<BodyArea[]> {
        return this.http.get<BodyArea[]>(this.BODY_AREA_URL);
    }

    public getBodyArea(): BodyAreaType[] {
        return [
            'lombaire',
            'lombaire-barre',
            'lombaire-zone__left',
            'lombaire-zone__right',
            'fessiers',
            'fessiers__left',
            'fessiers__right',
            'sacro-illiaque',
            'sacro-illiaque__left',
            'sacro-illiaque__right'
        ];
    }

    public getBodyAreaByType(bodyAreaType: BodyAreaType): Observable<BodyArea> {
        return this.getBodyAreas().pipe(
            map(bodyAreaList => this.filterById(bodyAreaList, bodyAreaType)),
        );
    }

    private filterById(bodyAreaList: BodyArea[], bodyAreaType: BodyAreaType): BodyArea {
        if (!bodyAreaList) return null;
        return bodyAreaList.find(bodyArea => bodyArea.type === bodyAreaType);
    }
}
