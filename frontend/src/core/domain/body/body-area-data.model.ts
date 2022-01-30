export declare type BodyAreaType =
    | 'back'
    | 'back-bar'
    | 'back-zone__left'
    | 'back-zone__right'
    | 'sacro__left'
    | 'sacro__right'
    | 'groin__left'
    | 'groin__right'
    | 'buttock'
    | 'buttock__left'
    | 'buttock__right'
    | 'thigh__left'
    | 'thigh__right'
    | 'calf__left'
    | 'calf__right';

export declare type BodyDirection = 'front' | 'back';
export declare type BodyAreaPlace = 'backZone' | 'backBar' | 'sacro' | 'buttock' | 'thigh' | 'calf';
export declare type BodyAreaRange = 'zoneH' | 'zoneV' | 'local';
export declare type BodyAreaSide =
    | 'left'
    | 'leftSm'
    | 'leftBig'
    | 'right'
    | 'rightSm'
    | 'rightBig'
    | 'center';

export interface BodyArea {
    type: BodyAreaType;
    order: number;
    name: string;
    details: string;
    imgPath: string;

    place: BodyAreaPlace;
    range: BodyAreaRange;
    side: BodyAreaSide;
    direction: BodyDirection[];
}
