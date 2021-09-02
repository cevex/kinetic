import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExerciseDataServiceCache } from '~/app/modules/core/domain/exercices/exercise-data.service.cache';
import { ExerciseData } from '../../../core/domain/exercices/exercise-data.model';
import { ExerciseHealthcheckTask } from '../../../core/domain/healthcheck-task/specific/exercise-healthcheck-task.model';
import { HealthcheckRouterService } from '../../../core/router/healthcheck-router.service';

@Component({
    selector: 'knt-exercise',
    templateUrl: './exercise.component.html',
    styleUrls: ['./exercise.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseComponent implements OnInit {

    // ===================   Elements  ========================================

    @ViewChild('videoElement') videoElement: ElementRef;

    // ===================   Internals  ========================================

    public exerciseTask: ExerciseHealthcheckTask;
    public exercise: ExerciseData;

    constructor(
        private cdr: ChangeDetectorRef,
        private exerciseDataServiceCache: ExerciseDataServiceCache,
        private healthcheckRouterService: HealthcheckRouterService,
    ) {
    }

    ngOnInit(): void {
        this.initData();
    }

    private initData() {
        this.exerciseTask = <ExerciseHealthcheckTask>this.healthcheckRouterService.getCurrentTask();
        this.exercise = this.exerciseDataServiceCache.getFlat()
            .find(exercise => exercise.id === this.exerciseTask.exerciseId);
        console.log('loaded exerciseTask', this.exerciseTask);
        console.log('loaded exerciseDataServiceCache', this.exerciseDataServiceCache.getFlat());
        console.log('loaded exercises', this.exercise);
        console.log('loaded exercises', this.exercise);
    }

    public goNext() {
        this.healthcheckRouterService.showAssessment();
    }
}
