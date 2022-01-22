import {
    BodyArea,
    BodyAreaPlace,
    BodyAreaRange,
    BodyAreaSide,
    BodyDirection
} from '../../../core/domain/body/body-area-data.model';
import { BodyAreaDataService } from '../../../core/domain/body/body-area-data.service';
import { Dimension } from '../../common/dimension.model';
import { PainLocationSelectorProp } from './pain-location-selector.component';
import { PainLocationSelectorState } from './pain-location-selector.model';

export interface BodyPosition {
    id: string;

    x: number;
    y: number;
    width: number;
    height: number;

    label: string;
}

export class PainLocationSelectorService {
    private static AREA_DIMENSION = {
        zoneH: {
            width: 50,
            height: 10
        },
        zoneV: {
            width: 10,
            height: 45
        },
        local: {
            width: 15,
            height: 15
        }
    };

    private static AREA_X = {
        leftBig: 56,
        left: 60,
        leftSm: 63,
        center: 55,
        rightSm: 83,
        right: 85,
        rightBig: 93
    };
    private static AREA_Y: any = {
        backZone: 143,
        backBar: 162,
        sacro: 178,
        buttock: 200,
        groin: 205,
        thigh: 240,
        calf: 320
    };

    // All the position have been computed with the "defaultDimension", they are shift to fit in "actualDimension"
    private static defaultComponentDimension = { width: 161, height: 432 };

    // =================================================================
    //              Init
    // =================================================================

    public static initState(
        props: PainLocationSelectorProp,
        viewDimension: Dimension
    ): PainLocationSelectorState {
        // const bodyAreas = BodyAreaDataService.getBodyAreas();
        return {
            image: this.getImage(props.bodyDirection),
            bodyPositions: this.mapAreas(props, viewDimension)
            // bodyPositions: this.buildAreasRef()
        };
    }

    private static getImage(bodyDirection: BodyDirection) {
        return bodyDirection === 'back'
            ? require('../../../assets/images/body-map-back.png')
            : require('../../../assets/images/body-map-front.png');
    }

    // =================================================================
    //              Mapping
    // =================================================================

    private static mapAreas(
        props: PainLocationSelectorProp,
        viewDimension: Dimension
    ): BodyPosition[] {
        return BodyAreaDataService.getBodyAreasByDirection(props.bodyDirection).map(bodyArea =>
            this.mapArea(bodyArea, viewDimension)
        );
    }

    private static mapArea(area: BodyArea, viewDimension: Dimension): BodyPosition {
        const dimension = this.getAreaDimension(area.range);
        return {
            id: area.type,
            label: area.name,

            x: this.getX(area.side, viewDimension),
            y: this.getY(area.place, viewDimension),
            width: dimension.width,
            height: dimension.height
        };
    }

    private static getAreaDimension(range: BodyAreaRange): Dimension {
        return this.AREA_DIMENSION[range];
    }

    // =================================================================
    //              Dimension computing
    // =================================================================

    private static getX(side: BodyAreaSide, viewDimension: Dimension): number {
        return this.defaultToActualX(this.AREA_X[side], viewDimension);
    }

    private static getY(place: BodyAreaPlace, viewDimension: Dimension): number {
        return this.defaultToActualY(this.AREA_Y[place], viewDimension);
    }

    private static defaultToActualX(defaultPosX: number, viewDimension: Dimension): number {
        return (defaultPosX * viewDimension.width) / this.defaultComponentDimension.width;
    }

    private static defaultToActualY(defaultPosY: number, viewDimension: Dimension): number {
        return (defaultPosY * viewDimension.height) / this.defaultComponentDimension.height;
    }

    /**
     * Build a grid to put point at each corner, to debug positioning.
     */
    public static buildAreasRef(): BodyPosition[] {
        return [
            {
                id: '1',
                label: '1',
                x: 0,
                y: 0,
                width: 20,
                height: 20
            },
            {
                id: '2',
                label: '2',
                // x: 1080 - 10,
                // y: 2080 - 10,
                x: this.defaultComponentDimension.width / 2 - this.AREA_DIMENSION.local.width / 2,
                y: 0,
                width: this.AREA_DIMENSION.local.width,
                height: this.AREA_DIMENSION.local.width
            },
            {
                id: '3',
                label: '3',

                x: this.defaultComponentDimension.width - this.AREA_DIMENSION.local.width,
                y: 0,
                width: this.AREA_DIMENSION.local.width,
                height: this.AREA_DIMENSION.local.height
            },
            {
                id: '4',
                label: '4',

                x: 0,
                y: this.defaultComponentDimension.height / 2 - this.AREA_DIMENSION.local.height / 2,
                width: this.AREA_DIMENSION.local.width,
                height: this.AREA_DIMENSION.local.height
            },
            {
                id: '5',
                label: '5',

                x: this.defaultComponentDimension.width / 2 - this.AREA_DIMENSION.local.width / 2,
                y: this.defaultComponentDimension.height / 2 - this.AREA_DIMENSION.local.width / 2,
                width: this.AREA_DIMENSION.local.width,
                height: this.AREA_DIMENSION.local.height
            },
            {
                id: '6',
                label: '6',

                x: this.defaultComponentDimension.width - this.AREA_DIMENSION.local.width,
                y: this.defaultComponentDimension.height / 2 - this.AREA_DIMENSION.local.width / 2,
                width: this.AREA_DIMENSION.local.width,
                height: this.AREA_DIMENSION.local.height
            },
            {
                id: '7',
                label: '7',

                x: 0,
                y: this.defaultComponentDimension.height - this.AREA_DIMENSION.local.width / 2,
                width: this.AREA_DIMENSION.local.width,
                height: this.AREA_DIMENSION.local.height
            },
            {
                id: '8',
                label: '8',

                x: this.defaultComponentDimension.width / 2 - this.AREA_DIMENSION.local.width / 2,
                y: this.defaultComponentDimension.height - this.AREA_DIMENSION.local.width / 2,
                width: this.AREA_DIMENSION.local.width,
                height: this.AREA_DIMENSION.local.height
            },
            {
                id: '9',
                label: '9',

                x: this.defaultComponentDimension.width - this.AREA_DIMENSION.local.width,
                y: this.defaultComponentDimension.height - this.AREA_DIMENSION.local.width / 2,
                width: this.AREA_DIMENSION.local.width,
                height: this.AREA_DIMENSION.local.height
            }
        ];
    }
}
