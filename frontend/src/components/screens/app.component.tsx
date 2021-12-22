import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import HomeScreen from './home-screen.component';
import PainLocationChoiceScreen from './pain-location/pain-location-choice-screen.component';
import PainLocationScreen from './pain-location/pain-location-screen.component';
import WelcomeScreen from './welcome/welcome-screen.component';

const Stack = createNativeStackNavigator();

class AppComponent extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="PainLocationChoice"
                    screenOptions={{
                        headerShown: false
                    }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                    <Stack.Screen name="PainLocation" component={PainLocationScreen} />
                    <Stack.Screen name="PainLocationChoice" component={PainLocationChoiceScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default AppComponent;
