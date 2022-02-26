import { Exercise } from '../../../../core/domain/exercices/exercise.model';

export interface HealthcheckRedoScreenState {
    previousExercise: Exercise;
    exerciseAdditional: Exercise;
}
