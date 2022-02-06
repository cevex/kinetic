import { StyleProp, ViewStyle } from 'react-native';
import { UiItem } from '../core/ui-item.model';

export interface SelectProp {
    items: UiItem[];
    selectedItemId?: string;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    onSelected?: ((item: UiItem) => void) | undefined;
}
