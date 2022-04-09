import { UiItem } from '../../../ui/core/ui-item.model';

export interface PathologyEvaluationState {
    firstStep: boolean;

    assessmentChoices: UiItem[];
    todayChoice: UiItem;
    exercisesChoice: UiItem;

    locationChoices: UiItem[];
    locationChoice: UiItem;
}
