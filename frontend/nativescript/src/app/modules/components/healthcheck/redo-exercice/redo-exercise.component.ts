import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BodyArea } from '~/app/modules/core/domain/body/body-area-data.model';
import { ExerciseDataServiceCache } from '~/app/modules/core/domain/exercices/exercise-data.service.cache';
import { HealthcheckTaskServiceCache } from '~/app/modules/core/domain/healthcheck-task/healthcheck-task-data.service.cache';
import { ExerciseHealthcheckTask } from '~/app/modules/core/domain/healthcheck-task/specific/exercise-healthcheck-task.model';
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
    public bodyArea: BodyArea;

    // =======================================================================
    //                          Constructor
    // =======================================================================

    constructor(
        private exerciseDataServiceCache: ExerciseDataServiceCache,
        private healthcheckRouterService: HealthcheckRouterService,
        private healthcheckTaskServiceCache: HealthcheckTaskServiceCache
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
        const exerciseTask = <ExerciseHealthcheckTask>this.healthcheckTaskServiceCache
            .findTask(this.redoTask.exerciseTaskToRedo);
        this.exercise = this.exerciseDataServiceCache.getFlat()
            .find(exercise => exercise.id === exerciseTask.exerciseId);
        this.bodyArea = this.healthcheckRouterService.getBodyArea();
    }

    public getText(): string {
        if (!this.exercise || !this.exercise.advice || this.exercise.advice.trim() === '') return;
        return 'Avez-vous bien ' + this.exercise.advice.toLowerCase() + ' ?';
    }

    public goNext() {
        this.healthcheckRouterService.redoExercise();
    }
}
