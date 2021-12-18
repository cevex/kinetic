import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { CatComponent } from './cat.component';

export class ExampleScreenComponent extends Component {
    render() {
        return (
            <View>
                <Text>My app !</Text>
                <Image
                    source={{ uri: 'https://reactnative.dev/docs/assets/p_cat1.png' }}
                    style={{
                        width: 200,
                        height: 200
                    }}
                />
                <Image
                    source={require('../assets/images/kinetic-name.png')}
                    style={{
                        width: 200,
                        height: 200
                    }}
                />
                <View>
                    <CatComponent name="Munkustrap" />
                    <CatComponent name="Spot" />
                </View>
            </View>
        );
    }
}
