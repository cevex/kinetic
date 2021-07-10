import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ExerciseDataServiceCache } from '~/app/modules/core/domain/exercices/exercise-data.service.cache';
import { HealthcheckRouterService } from '~/app/modules/core/router/healthcheck-router.service';
import { ExerciseData } from '../../../core/domain/exercices/exercise-data.model';
import { RedoHealthcheckTask } from '../../../core/domain/healthcheck-task/specific/redo-healthcheck-task.model';

@Component({
    selector: 'knt-redo-exercise',
    templateUrl: './redo-exercise.component.html',
    styleUrls: ['./redo-exercise.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedoExerciseComponent implements OnInit {

    // =======================================================================
    //                          Attributes
    // =======================================================================

    public redoTask: RedoHealthcheckTask;
    public exercise: ExerciseData;

    // =======================================================================
    //                          Constructor
    // =======================================================================

    constructor(
        private exerciseDataServiceCache: ExerciseDataServiceCache,
        private healthcheckRouterService: HealthcheckRouterService
    ) {
    }

    ngOnInit(): void {
        this.initData();
    }

    // =======================================================================
    //                          Actions
    // =======================================================================

    private initData() {
        this.redoTask = <RedoHealthcheckTask>this.healthcheckRouterService.getCurrentTask();
        this.exercise = this.exerciseDataServiceCache.getFlat()
            .find(exercise => exercise.id === this.redoTask.exerciseId);
    }

    public goNext() {
        this.healthcheckRouterService.redoExercise();
    }
}
