import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { HealthcheckActionner } from '../../../../core/store/healthcheck/healthcheck.actions';
import { ScreenProp } from '../../../common/navigable-screen-prop.model';
import I18n from '../../../i18n';
import { globalStyles, globalVariables } from '../../../styles';
import KntButton from '../../../ui/button/button.component';

interface HealthcheckGuideScreenProp extends ScreenProp {
    seeDisclaimer: () => void;
}

class HealthcheckGuideScreen extends Component<HealthcheckGuideScreenProp> {
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
                    onPress={() => this.props.seeDisclaimer()}
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

export default connect(null, (dispatch: Dispatch) => ({
    seeDisclaimer: () => dispatch(HealthcheckActionner.seeDisclaimer())
}))(HealthcheckGuideScreen);
