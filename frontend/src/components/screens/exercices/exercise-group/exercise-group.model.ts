import { Exercise } from '../../../../core/domain/exercices/exercise.model';

export interface ExerciseGroupElement {
    id: string;
    title: string;

    exercises?: Exercise[];
    subGroup?: ExerciseGroupElement[];
}
