import { Healthcheck } from '../store/healthcheck/healthcheck.model';

export class HealthcheckRouter {
    public static roots = {
        guide: 'HealthcheckGuide',
        painAssessment: 'healthcheck/pain-assessment',
        painLocation: 'PainLocation',
        exercise: 'Exercise',
        redoExercise: 'RedoExercise',
        diagnosis: 'Diagnosis',
        consult: 'consult'
    };

    constructor() {}

    // =======================================================================
    //                Routing
    // =======================================================================

    public static rootHealthcheck(healthcheck: Healthcheck) {
        const path = this.getHealthcheckPath(healthcheck);
        console.log('[router-healthcheck] ROOT path : ', path);
        // this.routerExtensions.navigate([path]);
    }

    public static showAssessment() {
        // this.routerExtensions.navigate(['healthcheck/pain-assessment']);
    }

    private static getHealthcheckPath(healthcheck: Healthcheck) {
        // const currentTask = this.healthcheckTaskServiceCache.findTask(healthcheck.taskId);
        // console.log('[router-healthcheck] ROOTing to task: ', currentTask);
        //
        // if (!healthcheck.bodyArea) {
        //     return this.roots.painLocation;
        // }
        // if (this.healthcheckDataService.shouldShowHealthcheckGuide(healthcheck)) {
        //     return HealthcheckRouterService.HEALTHCHECK_ROOT.guide;
        // }
        // switch (currentTask.type) {
        //     case 'exercise':
        //         return HealthcheckRouterService.HEALTHCHECK_ROOT.exercise;
        //     case 'diagnosis':
        //         return HealthcheckRouterService.HEALTHCHECK_ROOT.diagnosis;
        //     case 'consult':
        //         return HealthcheckRouterService.HEALTHCHECK_ROOT.consult;
        //     case 'redo':
        //         return HealthcheckRouterService.HEALTHCHECK_ROOT.redoExercise;
        //     case 'pain-assessment':
        //         return HealthcheckRouterService.HEALTHCHECK_ROOT.painAssessment;
        //     case 'test-location':
        //     case 'change-location':
        //         return HealthcheckRouterService.HEALTHCHECK_ROOT.painLocation;
        // }
    }
}
