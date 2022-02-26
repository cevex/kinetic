import { HealthcheckTaskService } from '../../../core/domain/healthcheck-task/healthcheck-task.service';
import { Healthcheck } from '../../../core/domain/healthcheck/healthcheck.model';
import { RootNavigation } from '../../common/root-navigator';

export class HealthcheckRouter {
    public static routes = {
        exercise: 'HealthcheckExercise',
        consult: 'HealthcheckConsult',
        guide: 'HealthcheckGuide',
        diagnosis: 'HealthcheckDiagnosis',
        painLocation: 'HealthcheckPainLocation',
        painLocationChoice: 'HealthcheckPainLocationChoice',
        redoExercise: 'HealthcheckRedoExercise',
        testLocation: 'TestLocation',
        welcome: 'HealthcheckWelcome'
    };

    constructor() {}

    // =======================================================================
    //                Routing
    // =======================================================================

    public static rootToTask(healthcheck: Healthcheck) {
        const screenPath = this.getHealthcheckRoot(healthcheck);
        console.log('[HealthcheckRouter] => ROUTE to', screenPath);
        RootNavigation.navigate(screenPath);
    }

    private static getHealthcheckRoot(healthcheck: Healthcheck) {
        if (!healthcheck.bodyArea) return this.routes.painLocation;
        if (!healthcheck.disclaimerSeen) return this.routes.guide;

        const currentTask = HealthcheckTaskService.findTaskById(healthcheck.taskId);
        switch (currentTask.type) {
            case 'diagnosis':
                return this.routes.diagnosis;
            case 'change-location':
                return this.routes.painLocation;
            case 'consult':
                return this.routes.consult;
            case 'exercise':
                return this.routes.exercise;
            case 'redo':
                return this.routes.redoExercise;
            case 'test-location':
                return this.routes.testLocation;
        }
    }
}
