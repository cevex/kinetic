import { Exercise } from '../../../../core/domain/exercices/exercise.model';
import { UiItem } from '../../../ui/core/ui-item.model';

export interface PathologySessionState {
    nbSession: number;
    currentSession: number;

    phaseName: string;
    sessions: UiItem[];
    selectedSession: string;

    exercises: Exercise[];
    selectedExercises: string[];
}
