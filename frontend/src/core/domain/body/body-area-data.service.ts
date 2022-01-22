import bodyAreas from '../../../assets/data/body-area.data.json';
import { BodyArea, BodyAreaType, BodyDirection } from './body-area-data.model';

export class BodyAreaDataService {
    private static BODY_AREA_IMG = '../../../assets/img/body-location/';

    public static getBodyAreas(): BodyArea[] {
        return bodyAreas.map((bodyArea: any) => {
            return <BodyArea>bodyArea;
        });
    }

    public static getBodyAreasByDirection(direction: BodyDirection): BodyArea[] {
        const mapAreas = direction === 'front' ? this.getFrontAreas() : this.getBackAreas();
        return this.getBodyAreas().filter(bodyArea => mapAreas.includes(bodyArea.type));
    }

    public static getFrontAreas(): BodyAreaType[] {
        return ['groin__left', 'groin__right', 'thigh__left', 'thigh__right'];
    }

    public static getBackAreas(): BodyAreaType[] {
        return [
            'back-bar',
            'back-zone__left',
            'back-zone__right',
            'sacro__left',
            'sacro__right',
            'buttock__left',
            'buttock__right',
            'thigh__left',
            'thigh__right',
            'calf__left',
            'calf__right'
        ];
    }

    public static containsArea(areas: BodyArea[], areaType: BodyAreaType): boolean {
        return !!this.findArea(areas, areaType);
    }

    public static findArea(areas: BodyArea[], areaType: BodyAreaType): BodyArea | undefined {
        return areas.find(area => area.type === areaType);
    }
}
