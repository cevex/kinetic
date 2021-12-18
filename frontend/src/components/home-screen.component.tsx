import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { ScreenProp } from './common/navigation/navigable-screen-prop.model';

export class HomeScreenComponent extends Component<ScreenProp> {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Example')}
                />
            </View>
        );
    }
}
