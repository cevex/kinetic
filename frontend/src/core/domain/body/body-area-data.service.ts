import bodyAreas from '../../../assets/data/body-area.data.json';
import { BodyArea, BodyAreaType, BodyDirection } from './body-area-data.model';

export class BodyAreaDataService {
    private static BODY_AREA_IMG = '../../../assets/img/body-location/';

    public static getBodyAreas(): BodyArea[] {
        return bodyAreas.map((bodyArea: any) => <BodyArea>bodyArea);
    }

    public static getBodyAreasByTypes(areaTypes: BodyAreaType[]): BodyArea[] {
        return this.filterAreas(this.getBodyAreas(), areaTypes);
    }

    // =======================================================================
    //                Direction
    // =======================================================================

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

    // =======================================================================
    //                Sorting
    // =======================================================================

    public static getMainArea(areasType: BodyAreaType[]): BodyArea {
        const areas = BodyAreaDataService.getBodyAreasByTypes(areasType);
        BodyAreaDataService.sortArea(areas);
        return areas[0];
    }

    public static sortArea(areas: BodyArea[]) {
        areas.sort((area1: BodyArea, area2: BodyArea) => this.compare(area1, area2));
    }

    private static compare(area1: BodyArea, area2: BodyArea): number {
        return this.getAreaOrder(area1) - this.getAreaOrder(area2);
    }

    private static getAreaOrder(area: BodyArea): number {
        switch (area.place) {
            case 'backBar':
                return 1;
            case 'backZone':
                return 2;
            case 'sacro':
                return 3;
            case 'buttock':
            case 'thigh':
            case 'calf':
                return 4;
        }
    }

    // =======================================================================
    //                Manipulate
    // =======================================================================

    public static containsArea(areas: BodyArea[], areaType: BodyAreaType): boolean {
        return !!this.findArea(areas, areaType);
    }

    public static findArea(areas: BodyArea[], areaType: BodyAreaType): BodyArea {
        return areas.find(area => area.type === areaType);
    }

    public static filterAreas(areas: BodyArea[], areaTypes: BodyAreaType[]): BodyArea[] {
        return areas.filter(area => areaTypes.includes(area.type));
    }
}
