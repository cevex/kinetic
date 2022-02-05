import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Unsubscribe } from 'redux';
import { TreatmentAreaDataService } from '../../core/domain/diagnosis/treatment-area.service';
import { ExercisesService } from '../../core/domain/exercices/exercises.service';
import { TreatmentService } from '../../core/domain/treatment/treatment.service';
import { KineticStore } from '../../core/store/kinetic.store';
import { RootNavigation } from '../common/root-navigator';
import ConsultScreen from './healtcheck/consult-screen.component';
import DiagnosisScreen from './healtcheck/diagnosis/diagnosis-screen.component';
import ExerciseScreen from './healtcheck/exercices/exercise-screen.component';
import HealthcheckGuideScreen from './healtcheck/healthcheck-guide-screen.component';
import { HealthcheckRouter } from './healtcheck/healthcheck-router.service';
import PainLocationChoiceScreen from './healtcheck/pain-location/choice-screen/pain-location-choice-screen.component';
import PainLocationScreen from './healtcheck/pain-location/screen/pain-location-screen.component';
import HomeScreen from './home-screen.component';
import PathologyDashboardScreen from './pathology/dashboard/pathology-dashboard.component';
import { PathologyRouter } from './pathology/pathology-router.service';
import WelcomeScreen from './welcome/welcome-screen.component';

const Stack = createNativeStackNavigator();

class AppComponent extends Component {
    private store = KineticStore.initStore();
    private healthcheckChangeUnsub: Unsubscribe;

    private routes = {
        home: 'Home'
    };

    constructor(props: any) {
        super(props);
        this.store.subscribe(() => {
            const storeState = this.store.getState();
            if (storeState.onGoingHealthcheck && storeState.onGoingHealthcheck.treatmentStarted) {
                this.listenForHealthcheck();
            }
            console.log('[AppComponent] => New state :', storeState);
        });

        this.printNewTreatments();
    }

    private printNewTreatments() {
        const treatments = TreatmentService.getTreatments();
        const exercises = ExercisesService.getExercises();
        const treatmentArea = TreatmentAreaDataService.getTreatmentAreas();
        // console.log('[TreatmentService] => treatments :', treatments);
        // console.log('[TreatmentService] => exercises :', exercises);
        // console.log('[TreatmentService] => treatmentArea :', treatmentArea);

        const newTreatments = treatments.map(treatment => {
            const exercise = exercises.find(ex => ex.label === treatment.exercise);
            if (!exercise) {
                console.log('[TreatmentService] => cannot find :', treatment.exercise);
            } else {
                treatment.exercise = exercise.id;
            }
            return treatment;
        });
        console.log('[TreatmentService] => newTreatments :', newTreatments);
    }

    private listenForHealthcheck() {
        if (this.healthcheckChangeUnsub) return;
        console.log('[AppComponent] => START healthcheck listening');
        this.healthcheckChangeUnsub = this.store.subscribe(() => {
            // When Healthcheck is on going, handle navigation here
            const currentHealthcheck = this.store.getState().onGoingHealthcheck;
            HealthcheckRouter.rootToTask(currentHealthcheck);

            // When Healthcheck is over, Stop listening
            if (currentHealthcheck && currentHealthcheck.treatmentEnded) {
                this.healthcheckChangeUnsub();
                this.healthcheckChangeUnsub = null;
                console.log('[AppComponent] => STOP healthcheck listening');
            }
        });

        // First rooting
        HealthcheckRouter.rootToTask(this.store.getState().onGoingHealthcheck);
    }

    render() {
        return (
            <Provider store={this.store}>
                <NavigationContainer ref={RootNavigation.navigationRef}>
                    <Stack.Navigator
                        initialRouteName="Home"
                        screenOptions={{
                            headerShown: false
                        }}>
                        {/*======================= Base =====================================*/}

                        <Stack.Screen name={this.routes.home} component={HomeScreen} />
                        <Stack.Screen
                            name={PathologyRouter.routes.dashboard}
                            component={PathologyDashboardScreen}
                        />

                        {/*======================= HEALTHCHECK =====================================*/}
                        <Stack.Screen
                            name={HealthcheckRouter.routes.welcome}
                            component={WelcomeScreen}
                        />
                        <Stack.Screen
                            name={HealthcheckRouter.routes.guide}
                            component={HealthcheckGuideScreen}
                        />
                        <Stack.Screen
                            name={HealthcheckRouter.routes.painLocation}
                            component={PainLocationScreen}
                        />
                        <Stack.Screen
                            name={HealthcheckRouter.routes.painLocationChoice}
                            component={PainLocationChoiceScreen}
                        />
                        <Stack.Screen
                            name={HealthcheckRouter.routes.exercise}
                            component={ExerciseScreen}
                        />
                        {/*<Stack.Screen*/}
                        {/*    name={HealthcheckRouter.routes.redoExercise}*/}
                        {/*    component={RedoExerciseScreen} */}
                        {/*/>*/}
                        <Stack.Screen
                            name={HealthcheckRouter.routes.diagnosis}
                            component={DiagnosisScreen}
                        />
                        <Stack.Screen
                            name={HealthcheckRouter.routes.consult}
                            component={ConsultScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}

export default AppComponent;
