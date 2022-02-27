import { Exercise } from '../../../../core/domain/exercices/exercise.model';

export interface ExerciseGroupElement {
    title: string;

    exercises?: Exercise[];
    subGroup?: ExerciseGroupElement[];
}
