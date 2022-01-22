import { cloneDeep } from 'lodash-es';
import { BodyAreaType, BodyDirection } from '../../../core/domain/body/body-area-data.model';
import I18n from '../../i18n';
import { UiItem } from '../../ui/core/ui-item.model';
import { PainLocationScreenState } from './pain-location-screen.model';

export class PainLocationScreenService {
    private static sideOptions: UiItem[] = [
        {
            id: 'back',
            label: I18n.t('pain.area.back')
        },
        {
            id: 'front',
            label: I18n.t('pain.area.front')
        }
    ];

    // ===============================================================
    //              State management
    // ===============================================================

    public static initScreen(bodyDirection: BodyDirection): PainLocationScreenState {
        const selectedOptions = this.sideOptions.find(item => item.id === bodyDirection);
        return {
            directionOptions: this.sideOptions,
            selectedDirection: selectedOptions?.id as BodyDirection,
            selectedAreas: []
        };
    }

    public static setDirection(
        state: PainLocationScreenState,
        selectedDirection: BodyDirection
    ): PainLocationScreenState {
        const newState = cloneDeep(state);
        newState.selectedDirection = selectedDirection;
        return newState;
    }

    public static setSelectedAreas(
        state: PainLocationScreenState,
        selectedAreas: BodyAreaType[]
    ): PainLocationScreenState {
        const newState = cloneDeep(state);
        newState.selectedAreas = selectedAreas;
        return newState;
    }
}
