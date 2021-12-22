import bodyAreas from '../../../assets/data/body-area.data.json';
import { BodyArea, BodyAreaType } from './body-area-data.model';

export class BodyAreaDataService {
    private static BODY_AREA_IMG = '../../../assets/img/body-location/';

    public static getBodyAreas(): BodyArea[] {
        return bodyAreas.map((bodyArea: any) => {
            return <BodyArea>bodyArea;
        });
    }

    public static getBodyAreaTypes(): BodyAreaType[] {
        return [
            'lombaire',
            'lombaire-bar',
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

    public static containsArea(areas: BodyArea[], areaType: BodyAreaType): boolean {
        return !!this.findArea(areas, areaType);
    }

    public static findArea(areas: BodyArea[], areaType: BodyAreaType): BodyArea | undefined {
        return areas.find(area => area.type === areaType);
    }
}
