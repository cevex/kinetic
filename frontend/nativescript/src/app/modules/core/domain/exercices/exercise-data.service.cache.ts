import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheService } from '../../common/cache/cache.service';
import { ExerciseData } from './exercise-data.model';
import { ExerciseDataService } from './exercise-data.service';

@Injectable({
    providedIn: 'root'
})
export class ExerciseDataServiceCache extends CacheService<ExerciseData[]> {

    constructor(private exerciseService: ExerciseDataService) {
        super();
    }

    protected getData(): Observable<ExerciseData[]> {
        return this.exerciseService.getExercises();
    }
}
