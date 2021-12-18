import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScreenProp } from '../common/navigation/navigable-screen-prop.model';
import { globalVariables } from '../styles/styles';
import { KntButton } from '../common/ui/button.component';

class HomeScreen extends Component<ScreenProp> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Bienvenue sur</Text>
                    <Image source={require('../../assets/images/kinetic-name.png')} />
                    <Image source={require('../../assets/images/kinetic-logo.png')} />
                </View>
                <View style={styles.controls}>
                    <KntButton
                        label="Mes Traitements"
                        type="secondary"
                        onPress={() => this.props.navigation.navigate('PainLocation')}
                    />
                    <KntButton
                        label="Nouveau Traitement"
                        onPress={() => this.props.navigation.navigate('Welcome')}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalVariables.color.bg,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: globalVariables.color.primary,
        marginBottom: 10,
        fontSize: globalVariables.fontSize.big,
        fontWeight: '600'
    },
    controls: {
        width: '90%',
        margin: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default HomeScreen;
