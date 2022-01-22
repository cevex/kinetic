import { isEqual } from 'lodash-es';

export class SelectorService {
    /**
     * Handle select/unselect algorithm on a list
     */
    public static select(list: any[], selectedItem: any): any[] {
        if (!list || !selectedItem) return list;
        const alreadySelected = list.some(item => isEqual(item, selectedItem));
        return alreadySelected
            ? list.filter(item => !isEqual(item, selectedItem))
            : [...list, selectedItem];
    }
}
