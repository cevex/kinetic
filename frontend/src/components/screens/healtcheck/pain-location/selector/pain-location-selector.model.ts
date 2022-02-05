import { BodyPosition } from './pain-location-selector.service';

export declare type SideType = 'front' | 'back';

export interface PainLocationSelectorState {
    bodyPositions: BodyPosition[];
    image: any;
}
