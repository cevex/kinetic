import { Injectable } from '@angular/core';
import { Dimension } from '../../../core/common/nativescript-view.service';
import { BodyPosition } from './body-position.model';
import { BodyArea, BodyAreaPlace, BodyAreaRange, BodyAreaSide } from '../../../core/domain/body/body-area-data.model';

@Injectable({
    providedIn: 'root'
})
export class BodyMapService {

    private AREA_SIZE_ZONE = {width: 75, height: 20};
    private AREA_SIZE_LOCAL = {width: 20, height: 20};
    private AREA_X = {
        left: 160,
        center: 160,
        right: 210,
    };
    private AREA_Y = {
        back: 240,
        sacro: 275,
        buttock: 310,
    };

    // All the position have been computed with the "defaultDimension", they are shift to fit in "actualDimension"
    private defaultComponentDimension = {width: 393, height: 719};

    constructor() {
    }

    // =================================================================
    //              Mapping
    // =================================================================

    public mapAreas(bodyAreas: BodyArea[], viewDimension: Dimension): BodyPosition[] {
        if (!bodyAreas) return [];
        return bodyAreas.map(bodyArea => this.mapArea(bodyArea, viewDimension));
    }

    private mapArea(area: BodyArea, viewDimension: Dimension): BodyPosition {
        const dimension = this.getAreaDimension(area.range);
        return {
            id: area.type,
            label: area.name,

            x: this.getX(area.side, viewDimension),
            y: this.getY(area.place, viewDimension),
            width: dimension.width,
            height: dimension.height,
        };
    }

    private getAreaDimension(range: BodyAreaRange): Dimension {
        return range === 'zone' ? this.AREA_SIZE_ZONE : this.AREA_SIZE_LOCAL;
    }

    // =================================================================
    //              Dimension computing
    // =================================================================

    private getX(side: BodyAreaSide, viewDimension: Dimension): number {
        return this.defaultToActualX(this.AREA_X[side], viewDimension);
    }

    private getY(place: BodyAreaPlace, viewDimension: Dimension): number {
        return this.defaultToActualY(this.AREA_Y[place], viewDimension);
        // return this.AREA_Y[place]; //Mock with default size
    }

    private defaultToActualX(defaultPosX: number, viewDimension: Dimension): number {
        return (defaultPosX * viewDimension.width) /
            this.defaultComponentDimension.width;
    }

    private defaultToActualY(defaultPosY: number, viewDimension: Dimension): number {
        return (defaultPosY * viewDimension.height) /
            this.defaultComponentDimension.height;
    }


    public buildAreas(): BodyPosition[] {
        return [
            {
                id: '1',
                label: '1',

                x: 0,
                y: 0,
                width: 20,
                height: 20,
            },
            {
                id: '2',
                label: '2',

                // x: 1080 - 10,
                // y: 2080 - 10,
                x: this.defaultComponentDimension.width / 2 - this.AREA_SIZE_LOCAL.width,
                y: 0,
                width: this.AREA_SIZE_LOCAL.width,
                height: this.AREA_SIZE_LOCAL.width,
            },
            {
                id: '3',
                label: '3',

                x: this.defaultComponentDimension.width - this.AREA_SIZE_LOCAL.width,
                y: 0,
                width: this.AREA_SIZE_LOCAL.width,
                height: this.AREA_SIZE_LOCAL.height,
            },
            {
                id: '4',
                label: '4',

                x: 0,
                y: this.defaultComponentDimension.height / 2 - this.AREA_SIZE_LOCAL.height,
                width: this.AREA_SIZE_LOCAL.width,
                height: this.AREA_SIZE_LOCAL.height,
            },
            {
                id: '5',
                label: '5',

                x: this.defaultComponentDimension.width / 2 - this.AREA_SIZE_LOCAL.width,
                y: this.defaultComponentDimension.height / 2 - this.AREA_SIZE_LOCAL.width,
                width: this.AREA_SIZE_LOCAL.width,
                height: this.AREA_SIZE_LOCAL.height,
            },
            {
                id: '6',
                label: '6',

                x: this.defaultComponentDimension.width - this.AREA_SIZE_LOCAL.width,
                y: this.defaultComponentDimension.height / 2 - this.AREA_SIZE_LOCAL.width,
                width: this.AREA_SIZE_LOCAL.width,
                height: this.AREA_SIZE_LOCAL.height,
            },
            {
                id: '7',
                label: '7',

                x: 0,
                y: this.defaultComponentDimension.height - this.AREA_SIZE_LOCAL.width,
                width: this.AREA_SIZE_LOCAL.width,
                height: this.AREA_SIZE_LOCAL.height,
            },
            {
                id: '8',
                label: '8',

                x: this.defaultComponentDimension.width / 2 - this.AREA_SIZE_LOCAL.width,
                y: this.defaultComponentDimension.height - this.AREA_SIZE_LOCAL.width,
                width: this.AREA_SIZE_LOCAL.width,
                height: this.AREA_SIZE_LOCAL.height,
            },
            {
                id: '9',
                label: '9',

                x: this.defaultComponentDimension.width - this.AREA_SIZE_LOCAL.width,
                y: this.defaultComponentDimension.height - this.AREA_SIZE_LOCAL.width,
                width: this.AREA_SIZE_LOCAL.width,
                height: this.AREA_SIZE_LOCAL.height,
            }
        ];
    }
}
