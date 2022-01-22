import { BodyAreaType, BodyDirection } from '../../../core/domain/body/body-area-data.model';
import { UiItem } from '../../ui/core/ui-item.model';

export interface PainLocationScreenState {
    directionOptions: UiItem[];
    selectedDirection: BodyDirection;
    selectedAreas: BodyAreaType[];
}
