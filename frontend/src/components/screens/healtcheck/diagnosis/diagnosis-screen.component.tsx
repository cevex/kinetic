import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Healthcheck } from '../../../../core/domain/healthcheck/healthcheck.model';
import { HealthcheckActionner } from '../../../../core/store/healthcheck/healthcheck.actions';
import { KineticState } from '../../../../core/store/kinetic.state';
import { PathologyActionner } from '../../../../core/store/pathology/pathology.actions';
import { ScreenProp } from '../../../common/navigable-screen-prop.model';
import I18n from '../../../i18n';
import { globalStyles } from '../../../styles';
import KntButton from '../../../ui/button/button.component';
import { DiagnosisScreenState } from './diagnosis-screen.model';
import { DiagnosisScreenService } from './diagnosis-screen.service';
import styles from './diagnosis-screen.style';

interface DiagnosisScreenProp extends ScreenProp {
    healthcheck: Healthcheck;
    endHealthcheck: (healthcheck: Healthcheck) => void;
}

class DiagnosisScreen extends Component<DiagnosisScreenProp, DiagnosisScreenState> {
    constructor(props: DiagnosisScreenProp) {
        super(props);
        this.state = DiagnosisScreenService.initScreen(this.props.healthcheck.taskId);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={globalStyles.card}>
                    <Text style={globalStyles.cardTitle}>{I18n.t('diagnosis.open')}</Text>
                    <Text style={globalStyles.cardMessage}>{I18n.t('diagnosis.explain')}</Text>
                    <Text style={globalStyles.cardMessageHighlighted}>
                        {this.state.diagnosis.name}
                    </Text>
                    <Image source={require('../../../../assets/images/pain__back-left.png')} />
                </View>
                <KntButton
                    label={I18n.t('treatment.new')}
                    type="primary"
                    style={styles.controls}
                    onPress={() => this.props.endHealthcheck(this.props.healthcheck)}
                />
            </View>
        );
    }
}

export default connect(
    (state: KineticState) => ({
        healthcheck: state.onGoingHealthcheck
    }),
    (dispatch: Dispatch) => ({
        endHealthcheck: (healthcheck: Healthcheck) => {
            dispatch(HealthcheckActionner.endHealthcheck());
            dispatch(PathologyActionner.startPathology(healthcheck));
        }
    })
)(DiagnosisScreen);
