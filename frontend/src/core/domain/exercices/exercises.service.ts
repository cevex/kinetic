import exerciseData from '../../../assets/data/exercises.data.json';
import { Exercise } from './exercise.model';

export class ExercisesService {
    public static getExercises(): Exercise[] {
        return exerciseData as Exercise[];
    }

    public static getExercisesById(exercisesId: string): Exercise {
        return this.getExercises().find(exercises => exercises.id === exercisesId);
    }
}
