import { Injectable } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { cloneDeep } from 'lodash-es';
import { BodyArea } from '~/app/modules/core/domain/body/body-area-data.model';
import { BodyAreaDataServiceCache } from '~/app/modules/core/domain/body/body-area-data.service.cache';
import { PainAreaChoice } from '~/app/modules/core/domain/healthcheck-task/choice/pain-area-choice.model';
import { PainAssessmentChoiceType } from '~/app/modules/core/domain/healthcheck-task/choice/pain-assessment-choice.model';
import { HealthcheckTaskServiceCache } from '~/app/modules/core/domain/healthcheck-task/healthcheck-task-data.service.cache';
import { KineticStore } from '~/app/modules/core/store/kinetic-store.model';
import { KineticStoreService } from '~/app/modules/core/store/kinetic-store.service';
import { Healthcheck } from '../domain/healthcheck/healthcheck-data.model';
import { HealthcheckDataService } from '../domain/healthcheck/healthcheck-data.service';

@Injectable({
    providedIn: 'root'
})
export class HealthcheckRouterService {

    public static HEALTHCHECK_ROOT = {
        guide: 'healthcheck/guide',
        painAssessment: 'healthcheck/pain-assessment',
        painLocation: 'healthcheck/pain-location',
        exercise: 'healthcheck/exercise',
        redoExercise: 'healthcheck/redo-exercise',
        diagnosis: 'healthcheck/diagnosis',
        consult: 'healthcheck/consult',
    };

    constructor(
        private healthcheckDataService: HealthcheckDataService,
        private healthcheckTaskServiceCache: HealthcheckTaskServiceCache,
        private routerExtensions: RouterExtensions,
        private bodyAreaDataServiceCache: BodyAreaDataServiceCache,
        private storeService: KineticStoreService,
    ) {
    }

    // =======================================================================
    //                Routing
    // =======================================================================

    public rootHealthcheck(healthcheck: Healthcheck) {
        const path = this.getHealthcheckPath(healthcheck);
        console.log('[router-healthcheck] ROOT path : ', path);
        this.routerExtensions.navigate([path]);
    }

    public showAssessment() {
        this.routerExtensions.navigate(['healthcheck/pain-assessment']);
    }

    private getHealthcheckPath(healthcheck: Healthcheck) {
        const currentTask = this.healthcheckTaskServiceCache.findTask(healthcheck.taskId);
        console.log('[router-healthcheck] ROOTing to task: ', currentTask);

        if (!healthcheck.bodyArea) {
            return HealthcheckRouterService.HEALTHCHECK_ROOT.painLocation;
        }
        if (this.healthcheckDataService.shouldShowHealthcheckGuide(healthcheck)) {
            return HealthcheckRouterService.HEALTHCHECK_ROOT.guide;
        }
        switch (currentTask.type) {
            case 'exercise':
                return HealthcheckRouterService.HEALTHCHECK_ROOT.exercise;
            case 'diagnosis':
                return HealthcheckRouterService.HEALTHCHECK_ROOT.diagnosis;
            case 'consult':
                return HealthcheckRouterService.HEALTHCHECK_ROOT.consult;
            case 'redo':
                return HealthcheckRouterService.HEALTHCHECK_ROOT.redoExercise;
            case 'pain-assessment':
                return HealthcheckRouterService.HEALTHCHECK_ROOT.painAssessment;
            case 'test-location':
            case 'change-location':
                return HealthcheckRouterService.HEALTHCHECK_ROOT.painLocation;
        }
    }

    // =======================================================================
    //                Actions
    // =======================================================================

    public startHealthcheck() {
        const newState = this.healthcheckDataService.startHealthcheck();
        this.setHealthcheck(newState);
    }

    public assessExercise(choiceType: PainAssessmentChoiceType) {
        const currentState = this.storeService.getCurrentHealthcheck();
        const newState = this.healthcheckDataService.assessExercise(currentState, choiceType);
        this.setHealthcheck(newState);
    }

    public redoExercise() {
        const currentState = this.storeService.getCurrentHealthcheck();
        const newState = this.healthcheckDataService.redoExercise(currentState);
        this.setHealthcheck(newState);
    }

    public chooseLocation(choice: PainAreaChoice) {
        const currentState = this.storeService.getCurrentHealthcheck();
        const newState = this.healthcheckDataService.chooseLocation(currentState, choice);
        this.setHealthcheck(newState);
    }

    public seeHealthcheckGuide() {
        const currentState = this.storeService.getCurrentHealthcheck();
        const newState = this.healthcheckDataService.seeHealthcheckGuide(currentState);
        this.setHealthcheck(newState);
    }

    public endHealthcheck() {
        const currentState = this.storeService.getCurrentHealthcheck();
        const newState = this.healthcheckDataService.endHealthcheck(currentState, currentState.taskId);
        this.setOnGoingHealthcheck(newState);
    }

    // =======================================================================
    //                Store Utils
    // =======================================================================

    public getHealthcheck(): Healthcheck {
        return this.storeService.getStore().onGoingHealthcheck;
    }

    public getBodyArea(): BodyArea {
        const healthcheck = this.getHealthcheck();
        return this.bodyAreaDataServiceCache.findBodyArea(healthcheck.bodyArea);
    }

    public getCurrentTask() {
        const taskId = this.getHealthcheck().taskId;
        return this.healthcheckTaskServiceCache.findTask(taskId);
    }

    private setHealthcheck(healthcheck: Healthcheck) {
        this.setOnGoingHealthcheck(healthcheck);
        this.rootHealthcheck(healthcheck);
    }

    private setOnGoingHealthcheck(healthcheck: Healthcheck) {
        const currentState = this.storeService.getStore();
        const newState = <KineticStore>cloneDeep(currentState);
        newState.onGoingHealthcheck = healthcheck;
        this.storeService.setStore(newState);
    }
}
