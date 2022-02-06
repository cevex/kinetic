import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Unsubscribe } from 'redux';
import { KineticState } from '../../core/store/kinetic.state';
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
            if (this.isHealthcheckRouter(storeState)) {
                this.listenForHealthcheck();
            }
            console.log('[AppComponent] => New state :', storeState);
        });
    }

    private isHealthcheckRouter(storeState: KineticState) {
        return (
            storeState.onGoingHealthcheck &&
            storeState.onGoingHealthcheck.treatmentStarted &&
            !storeState.onGoingHealthcheck.treatmentEnded
        );
    }

    private listenForHealthcheck() {
        if (this.healthcheckChangeUnsub) return;
        console.log('[AppComponent] => START healthcheck listening');
        this.healthcheckChangeUnsub = this.store.subscribe(() => {
            const currentHealthcheck = this.store.getState().onGoingHealthcheck;
            // When Healthcheck is over, Stop listening
            if (currentHealthcheck && currentHealthcheck.treatmentEnded) {
                this.healthcheckChangeUnsub();
                this.healthcheckChangeUnsub = null;
                RootNavigation.navigate(PathologyRouter.routes.dashboard);
                console.log('[AppComponent] => STOP healthcheck listening');
            } else {
                // When Healthcheck is on going, handle navigation here
                HealthcheckRouter.rootToTask(currentHealthcheck);
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
                        // initialRouteName="Home"
                        initialRouteName={PathologyRouter.routes.dashboard}
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
