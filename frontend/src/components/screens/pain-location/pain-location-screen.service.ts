import { UiItem } from '../../ui/core/ui-item.model';
import I18n from '../../i18n';
import { PainLocationScreenState, SideType } from './pain-location-screen.model';

export class PainLocationScreenService {
    private static sideOptions: UiItem[] = [
        {
            id: 'back',
            label: I18n.t('pain.area.back'),
            image: require('../../../assets/images/body-map-back-zoned.png')
        },
        {
            id: 'front',
            label: I18n.t('pain.area.front'),
            image: require('../../../assets/images/body-map-front-zoned.png')
        }
    ];

    // ===============================================================
    //              State management
    // ===============================================================

    public static initScreen(sideType: SideType): PainLocationScreenState {
        const selectedOptions = this.sideOptions.find(item => item.id === sideType);
        return {
            sideOptions: this.sideOptions,
            selectedSideId: selectedOptions?.id,
            image: selectedOptions?.image
        };
    }
}
