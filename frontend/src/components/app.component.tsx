import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreenComponent } from './home-screen.component';
import { ExampleScreenComponent } from './example-screen.component';

const Stack = createNativeStackNavigator();

export class AppComponent extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}>
                    <Stack.Screen name="Home" component={HomeScreenComponent} />
                    <Stack.Screen name="Example" component={ExampleScreenComponent} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
