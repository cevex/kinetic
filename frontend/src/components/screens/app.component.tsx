import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import { KntStore } from '../../core/store/knt.store';
import DiagnosisScreen from './healtcheck/diagnosis-screen.component';
import ExerciseScreen from './healtcheck/exercices/exercise-screen.component';
import HealthcheckGuideScreen from './healtcheck/healthcheck-guide-screen.component';
import HomeScreen from './home-screen.component';
import PainLocationChoiceScreen from './pain-location/pain-location-choice-screen.component';
import PainLocationScreen from './pain-location/pain-location-screen.component';
import PathologyDashboardScreen from './pathology/pathology.component';
import WelcomeScreen from './welcome/welcome-screen.component';

const Stack = createNativeStackNavigator();

class AppComponent extends Component {
    constructor(props: any) {
        super(props);
        KntStore.initStore();
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="PainLocation"
                    screenOptions={{
                        headerShown: false
                    }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                    <Stack.Screen name="PainLocation" component={PainLocationScreen} />
                    <Stack.Screen name="PainLocationChoice" component={PainLocationChoiceScreen} />
                    <Stack.Screen name="HealthcheckGuide" component={HealthcheckGuideScreen} />
                    <Stack.Screen name="Exercise" component={ExerciseScreen} />
                    <Stack.Screen name="Diagnosis" component={DiagnosisScreen} />
                    <Stack.Screen name="PathologyDashboard" component={PathologyDashboardScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default AppComponent;
