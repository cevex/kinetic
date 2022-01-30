import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { KineticStore } from '../../core/store/kinetic.store';
import { RootNavigation } from '../common/root-navigator';
import ExerciseScreen from './exercices/exercise-screen.component';
import ConsultScreen from './healtcheck/consult-screen.component';
import DiagnosisScreen from './healtcheck/diagnosis-screen.component';
import HealthcheckGuideScreen from './healtcheck/healthcheck-guide-screen.component';
import { HealthcheckRouter } from './healtcheck/healthcheck-router.service';
import HomeScreen from './home-screen.component';
import PainLocationChoiceScreen from './pain-location/pain-location-choice-screen.component';
import PainLocationScreen from './pain-location/pain-location-screen.component';
import PathologyDashboardScreen from './pathology/pathology.component';
import WelcomeScreen from './welcome/welcome-screen.component';

const Stack = createNativeStackNavigator();

class AppComponent extends Component {
    private store = KineticStore.initStore();

    private routes = {
        home: 'Home',
        pathology: {
            dashboard: 'PathologyDashboard'
        }
    };

    constructor(props: any) {
        super(props);
        console.log('[AppComponent] Initial State :', this.store.getState());

        this.store.subscribe(() => {
            const currentState = this.store.getState();
            HealthcheckRouter.rootToTask(currentState.healthcheck);
            console.log('[AppComponent] => New state :', currentState);
        });
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
                            name={this.routes.pathology.dashboard}
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
