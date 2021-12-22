import { UiItem } from '../../common/ui/core/ui-item.model';

export declare type SideType = 'front' | 'back';

export interface PainLocationScreenState {
    sideOptions: UiItem[];
    selectedSideId?: string;
    image: any;
}
