import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BodyArea, BodyAreaType } from './body-area-data.model';

@Injectable({
    providedIn: 'root'
})
export class BodyAreaDataService {

    private BODY_AREA_URL = '~/assets/data/body-area.data.json';
    private BODY_AREA_IMG = '~/assets/img/body-location/';

    constructor(private http: HttpClient) {
    }

    public getBodyAreas(): Observable<BodyArea[]> {
        return this.http.get<BodyArea[]>(this.BODY_AREA_URL).pipe(
            map((bodyAreas: BodyArea[]) => {
                return bodyAreas.map(bodyArea => {
                    bodyArea.imgPath = this.BODY_AREA_IMG + this.getPainImage(bodyArea.type);
                    return bodyArea;
                });
            })
        );
    }

    public getPainImage(bodyAreaType: BodyAreaType): string {
        if (bodyAreaType.includes('lombaire')) return 'm-back.jpeg';
        if (bodyAreaType.includes('sacro-illiaque')) return 'sacro-iliaque.jpeg';
        if (bodyAreaType.includes('fessiers')) return 'm-fesse.jpeg';
    }

    public getBodyAreaTypes(): BodyAreaType[] {
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
