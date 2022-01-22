import React from "react";
import DiagnosisScreen from "../../components/screens/healtcheck/diagnosis-screen.component";
import ExerciseScreen from "../../components/screens/healtcheck/exercices/exercise-screen.component";
import HealthcheckGuideScreen from "../../components/screens/healtcheck/healthcheck-guide-screen.component";
import HomeScreen from "../../components/screens/home-screen.component";
import PainLocationChoiceScreen from "../../components/screens/pain-location/pain-location-choice-screen.component";
import PainLocationScreen from "../../components/screens/pain-location/pain-location-screen.component";
import PathologyDashboardScreen from "../../components/screens/pathology/pathology.component";
import WelcomeScreen from "../../components/screens/welcome/welcome-screen.component";
import { BodyAreaDataService } from '../domain/body/body-area-data.service';
import { Healthcheck } from '../domain/healthcheck/healthcheck.model';
import { HealthcheckService } from '../domain/healthcheck/healthcheck.service';

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
<Stack.Screen name="Home" component={HomeScreen} />
<Stack.Screen name="Welcome" component={WelcomeScreen} />
<Stack.Screen name="PainLocation" component={PainLocationScreen} />
<Stack.Screen name="HealthcheckGuide" component={HealthcheckGuideScreen} />
<Stack.Screen name="Exercise" component={ExerciseScreen} />
<Stack.Screen name="Diagnosis" component={DiagnosisScreen} />
<Stack.Screen name="PathologyDashboard" component={PathologyDashboardScreen} />
    constructor() {}

    // =======================================================================
    //                Routing
    // =======================================================================

    public static rootHealthcheck(healthcheck: Healthcheck) {
        const path = this.getHealthcheckPath(healthcheck);
        console.log('[router-healthcheck] ROOT path : ', path);
        this.routerExtensions.navigate([path]);
    }

    public static showAssessment() {
        this.routerExtensions.navigate(['healthcheck/pain-assessment']);
    }

    private static getHealthcheckPath(healthcheck: Healthcheck) {
        const currentTask = this.healthcheckTaskServiceCache.findTask(healthcheck.taskId);
        console.log('[router-healthcheck] ROOTing to task: ', currentTask);

        if (!healthcheck.bodyArea) {
            return this.roots.painLocation;
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

    public static startHealthcheck() {
        const newState = HealthcheckService.startHealthcheck();
        this.setHealthcheck(newState);
    }

    public static assessExercise(choiceType: PainAssessmentChoiceType) {
        const currentState = this.storeService.getCurrentHealthcheck();
        const newState = this.healthcheckDataService.assessExercise(currentState, choiceType);
        this.setHealthcheck(newState);
    }

    public static redoExercise() {
        const currentState = this.storeService.getCurrentHealthcheck();
        const newState = this.healthcheckDataService.redoExercise(currentState);
        this.setHealthcheck(newState);
    }

    public static chooseLocation(choice: PainAreaChoice) {
        const currentState = this.storeService.getCurrentHealthcheck();
        const newState = this.healthcheckDataService.chooseLocation(currentState, choice);
        this.setHealthcheck(newState);
    }

    public static seeHealthcheckGuide() {
        const currentState = this.storeService.getCurrentHealthcheck();
        const newState = this.healthcheckDataService.seeHealthcheckGuide(currentState);
        this.setHealthcheck(newState);
    }

    public static endHealthcheck() {
        const currentState = this.storeService.getCurrentHealthcheck();
        const newState = this.healthcheckDataService.endHealthcheck(
            currentState,
            currentState.taskId
        );
        this.setHealthcheck(newState);
    }

    private setHealthcheck(healthcheck: Healthcheck) {
        this.setOnGoingHealthcheck(healthcheck);
        this.rootHealthcheck(healthcheck);
    }
}
