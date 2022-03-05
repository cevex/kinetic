import { ExercisesService } from '../../../../core/domain/exercices/exercises.service';
import { ExerciseDetailsState } from './exercise-details-screen.model';

export class ExerciseDetailsScreenService {
    public static initScreen(exerciseId: string): ExerciseDetailsState {
        const exercise = ExercisesService.getExercisesById(exerciseId);
        return {
            exercise: exercise
        };
    }
}
