export declare type BodyAreaType =
    'lombaire' |
    'lombaire-barre' |
    'lombaire-zone__left' |
    'lombaire-zone__right' |

    'fessiers' |
    'fessiers__left' |
    'fessiers__right' |

    'sacro-illiaque' |
    'sacro-illiaque__left' |
    'sacro-illiaque__right';

export declare type BodyAreaPlace = 'lombaire' | 'fessiers' | 'sacro';
export declare type BodyAreaRange = 'zone' | 'local';
export declare type BodyAreaSide = 'left' | 'right' | 'center';

export class BodyArea {
    type: BodyAreaType;
    name: string;

    place: BodyAreaPlace;
    range: BodyAreaRange;
    side: BodyAreaSide;
}
