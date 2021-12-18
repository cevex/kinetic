import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './home-screen.component';
import PainLocationScreen from './pain-location-screen.component';
import WelcomeScreen from './welcome-screen.component';

const Stack = createNativeStackNavigator();

class AppComponent extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="PainLocation" component={PainLocationScreen} />
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default AppComponent;
