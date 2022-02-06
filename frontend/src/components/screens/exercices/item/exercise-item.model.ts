import { Exercise } from '../../../../core/domain/exercices/exercise.model';

export interface ExerciseItem {
    exercise: Exercise;
    selected: boolean;
}
