import { Exercise } from '../../../core/domain/exercices/exercise.model';
import { UiItem } from '../../ui/core/ui-item.model';

export interface ExerciseScreenState {
    exercise?: Exercise;
    choices: UiItem[];
    selectedChoice: UiItem;
}
