import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScreenProp } from '../common/navigation/navigable-screen-prop.model';

class PainLocationScreen extends Component<ScreenProp> {
    render() {
        return <Text>Selectionnez les zones de douleurs</Text>;
    }
}

const styles = StyleSheet.create({});

export default PainLocationScreen;
