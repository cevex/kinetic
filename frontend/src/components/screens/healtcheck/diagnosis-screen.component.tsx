import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScreenProp } from '../../common/navigable-screen-prop.model';
import I18n from '../../i18n';
import { globalStyles, globalVariables } from '../../styles';
import KntButton from '../../ui/button/button.component';

class DiagnosisScreen extends Component<ScreenProp> {
    render() {
        return (
            <View style={styles.container}>
                <View style={globalStyles.card}>
                    <Text style={globalStyles.cardTitle}>{I18n.t('diagnosis.open')}</Text>
                    <Text style={globalStyles.cardMessage}>{I18n.t('diagnosis.explain')}</Text>
                    <Text style={globalStyles.cardMessageHighlighted}>Lombalgie L1 - L2</Text>
                    <Image source={require('../../../assets/images/pain__back-left.png')} />
                </View>
                <KntButton
                    label={I18n.t('treatment.new')}
                    type="primary"
                    style={styles.controls}
                    onPress={() => this.props.navigation.navigate('PathologyDashboard')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalVariables.color.grey.light,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    controls: {
        width: '90%',
        marginBottom: 10
    }
});

export default DiagnosisScreen;
