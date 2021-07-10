import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BodyArea } from '~/app/modules/core/domain/body/body-area-data.model';
import { BodyAreaDataServiceCache } from '~/app/modules/core/domain/body/body-area-data.service.cache';
import { ExerciseDataServiceCache } from '~/app/modules/core/domain/exercices/exercise-data.service.cache';
import { HealthcheckTaskServiceCache } from '~/app/modules/core/domain/healthcheck-task/healthcheck-task-data.service.cache';
import { HealthcheckRouterService } from '~/app/modules/core/router/healthcheck-router.service';
import { ExerciseData } from '../../../core/domain/exercices/exercise-data.model';
import { PainAssessmentChoiceType } from '../../../core/domain/healthcheck-task/choice/pain-assessment-choice.model';
import { ExerciseHealthcheckTask } from '../../../core/domain/healthcheck-task/specific/exercise-healthcheck-task.model';

@Component({
    selector: 'knt-pain-assessment',
    templateUrl: './pain-assessment.component.html',
    styleUrls: ['./pain-assessment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PainAssessmentComponent implements OnInit {

    // =======================================================================
    //                          Attributes
    // =======================================================================

    public exerciseTask: ExerciseHealthcheckTask;
    public exercise: ExerciseData;
    public bodyAreas: BodyArea[];

    // =======================================================================
    //                          Constructor
    // =======================================================================

    constructor(
        private healthcheckRouterService: HealthcheckRouterService,
        private healthcheckTaskServiceCache: HealthcheckTaskServiceCache,
        private exerciseDataServiceCache: ExerciseDataServiceCache,
        private bodyAreaService: BodyAreaDataServiceCache,
        private cdr: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this.initData();
    }

    // =======================================================================
    //                          Actions
    // =======================================================================

    private initData() {
        this.initExercises();
        this.initBodyArea();
    }

    private initExercises() {
        this.exerciseTask = <ExerciseHealthcheckTask>this.healthcheckRouterService.getCurrentTask();
        this.exercise = this.exerciseDataServiceCache.getFlat()
            .find(exercise => exercise.id === this.exerciseTask.exerciseId);

        // Mock
        // this.exerciseDataServiceCache.get().subscribe(exercises => {
        //     this.exercise = exercises[0];
        //     this.cdr.detectChanges();
        // });
    }

    private initBodyArea() {
        const healthcheck = this.healthcheckRouterService.getHealthcheck();
        this.bodyAreas = this.bodyAreaService.getFlat()
            .filter(bodyArea => bodyArea.type === healthcheck.bodyArea);
        // Mock
        // this.bodyAreaService.get().subscribe(bodyAreas => {
        //     this.bodyAreas = [bodyAreas[0]];
        //     this.cdr.detectChanges();
        // });
    }

    public assessExercise(choiceType: PainAssessmentChoiceType) {
        this.healthcheckRouterService.assessExercise(choiceType);
    }
}
