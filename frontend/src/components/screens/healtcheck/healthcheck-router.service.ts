import { HealthcheckTaskService } from '../../../core/domain/healthcheck-task/healthcheck-task.service';
import { Healthcheck } from '../../../core/domain/healthcheck/healthcheck.model';
import { RootNavigation } from '../../common/root-navigator';
import { PathologyRouter } from '../pathology/pathology-router.service';

export class HealthcheckRouter {
    public static routes = {
        welcome: 'HealthcheckWelcome',
        guide: 'HealthcheckGuide',
        painLocation: 'HealthcheckPainLocation',
        painLocationChoice: 'HealthcheckPainLocationChoice',
        exercise: 'HealthcheckExercise',
        redoExercise: 'HealthcheckRedoExercise',
        diagnosis: 'HealthcheckDiagnosis',
        consult: 'HealthcheckConsult'
    };

    constructor() {}

    // =======================================================================
    //                Routing
    // =======================================================================

    public static rootToTask(healthcheck: Healthcheck) {
        const screenPath = this.getHealthcheckRoot(healthcheck);
        console.log('[AppComponent] => Routing to', screenPath);
        RootNavigation.navigate(screenPath);
    }

    private static getHealthcheckRoot(healthcheck: Healthcheck) {
        if (!healthcheck.bodyArea) return this.routes.painLocation;
        if (!healthcheck.disclaimerSeen) return this.routes.guide;

        const currentTask = HealthcheckTaskService.findTaskById(healthcheck.taskId);
        switch (currentTask.type) {
            case 'exercise':
                return this.routes.exercise;
            case 'diagnosis':
                return this.routes.diagnosis;
            case 'consult':
                return this.routes.consult;
            case 'redo':
                return this.routes.redoExercise;
            case 'test-location':
            case 'change-location':
                return this.routes.painLocation;
        }
    }
}
