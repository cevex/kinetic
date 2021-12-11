import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExerciseData } from './exercise-data.model';

@Injectable({
    providedIn: 'root'
})
export class ExerciseDataService {

    private EXERCISE_URL = '~/assets/data/exercises.data.json';

    constructor(private http: HttpClient) {
    }

    public getExercises(): Observable<ExerciseData[]> {
        return this.http.get<ExerciseData[]>(this.EXERCISE_URL);
    }

    public getExercisesById(exercisesId: string): Observable<ExerciseData> {
        return this.getExercises().pipe(
            map(exercisesList => this.filterById(exercisesList, exercisesId)),
        );
    }

    private filterById(exercisesList: ExerciseData[], exercisesId): ExerciseData {
        if (!exercisesList) return null;
        return exercisesList.find(exercises => exercises.id === exercisesId);
    }
}
