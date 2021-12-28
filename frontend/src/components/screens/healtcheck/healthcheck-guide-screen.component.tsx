import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenProp } from '../../common/navigable-screen-prop.model';
import I18n from '../../i18n';
import { globalStyles, globalVariables } from '../../styles';
import KntButton from '../../ui/button/button.component';

class HealthcheckGuideScreen extends Component<ScreenProp> {
    render() {
        return (
            <View style={styles.container}>
                <View style={globalStyles.card}>
                    <Text style={globalStyles.cardTitle}>{I18n.t('healthcheck.start')}</Text>
                    <Text style={globalStyles.cardMessage}>
                        {I18n.t('healthcheck.guide.first')}
                    </Text>
                    <Text style={globalStyles.cardMessage}>
                        {I18n.t('healthcheck.guide.second')}
                    </Text>
                    <Text style={globalStyles.cardMessage}>
                        {I18n.t('healthcheck.guide.third')}
                    </Text>
                </View>
                <KntButton
                    label={I18n.t('exercice.start')}
                    type="primary"
                    style={styles.controls}
                    onPress={() => this.props.navigation.navigate('Exercise')}
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

export default HealthcheckGuideScreen;
