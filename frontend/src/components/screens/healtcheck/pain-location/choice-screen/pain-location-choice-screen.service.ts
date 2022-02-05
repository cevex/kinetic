import { cloneDeep } from 'lodash-es';
import { PaginatorService } from '../../../../../core/common/paginator.service';
import { BodyAreaDataService } from '../../../../../core/domain/body/body-area-data.service';
import I18n from '../../../../i18n';
import { PainLocationChoiceScreenState } from './pain-location-choice-screen.model';

export class PainLocationChoiceScreenService {
    public static initScreen(): PainLocationChoiceScreenState {
        const areas = BodyAreaDataService.getBodyAreas().map(area => {
            const newArea = cloneDeep(area);
            newArea.name = I18n.t(area.name);
            newArea.details = I18n.t(area.details);
            return newArea;
        });
        return {
            bodyAreas: areas,
            focusArea: areas[0],
            focusIndex: 0,
            selectedAreas: [],
            focusAreaSelected: false
        };
    }

    // ===============================================================
    //              Area Navigation
    // ===============================================================

    public static goNext(
        currentState: PainLocationChoiceScreenState
    ): PainLocationChoiceScreenState {
        const newIndex = PaginatorService.incrementIndex(
            currentState.bodyAreas,
            currentState.focusIndex
        );
        return this.updateSelectedArea(currentState, newIndex);
    }

    public static goPrevious(
        currentState: PainLocationChoiceScreenState
    ): PainLocationChoiceScreenState {
        const newIndex = PaginatorService.decrementIndex(currentState.focusIndex);
        return this.updateSelectedArea(currentState, newIndex);
    }

    public static updateSelectedArea(
        currentState: PainLocationChoiceScreenState,
        index: number
    ): PainLocationChoiceScreenState {
        const newState = cloneDeep(currentState);
        newState.focusArea = currentState.bodyAreas[index];
        newState.focusIndex = index;
        newState.focusAreaSelected = this.isFocusAreaSelected(newState);
        return newState;
    }

    // ===============================================================
    //              Area Selection
    // ===============================================================

    public static toggleAreaSelection(
        currentState: PainLocationChoiceScreenState
    ): PainLocationChoiceScreenState {
        const newState = cloneDeep(currentState);
        newState.selectedAreas = this.isFocusAreaSelected(currentState)
            ? newState.selectedAreas.filter(area => area.type !== currentState.focusArea.type)
            : newState.selectedAreas.concat([currentState.focusArea]);
        newState.focusAreaSelected = this.isFocusAreaSelected(newState);
        return newState;
    }

    private static isFocusAreaSelected(currentState: PainLocationChoiceScreenState): boolean {
        return BodyAreaDataService.containsArea(
            currentState.selectedAreas,
            currentState.focusArea.type
        );
    }
}
