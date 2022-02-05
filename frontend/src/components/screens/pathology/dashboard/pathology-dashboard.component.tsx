import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenProp } from '../../../common/navigable-screen-prop.model';
import { globalStyles, globalVariables } from '../../../styles';

class PathologyDashboardScreen extends Component<ScreenProp> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={globalStyles.cardMessage}>Pathology Dashboard</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalVariables.color.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default PathologyDashboardScreen;
