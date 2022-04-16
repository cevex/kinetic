import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Healthcheck } from '../../../core/domain/healthcheck/healthcheck.model';
import { KineticState } from '../../../core/store/kinetic.state';
import { ScreenProp } from '../../common/navigable-screen-prop.model';
import I18n from '../../i18n';
import KntButton from '../../ui/actions/button/button.component';
import styles from './home-screen.style';

export interface HomeScreenProp extends ScreenProp {
    healthcheck: Healthcheck;
    startHealthcheck: () => void;
}

class HomeScreen extends Component<HomeScreenProp> {
    constructor(props: HomeScreenProp) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{I18n.t('welcome.title')}</Text>
                    <Image source={require('../../../assets/images/kinetic-name.png')} />
                    <Image source={require('../../../assets/images/kinetic-logo.png')} />
                </View>
                <View style={styles.controls}>
                    {this.props.healthcheck?.treatmentStarted && (
                        <KntButton
                            label={I18n.t('treatment.open')}
                            type="secondary"
                            fitWith={true}
                            onPress={() => this.props.navigation.navigate('PathologyDashboard')}
                        />
                    )}

                    <KntButton
                        label={I18n.t('treatment.new')}
                        fitWith={true}
                        onPress={() => this.props.navigation.navigate('HealthcheckWelcome')}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: KineticState) => ({
    healthcheck: state.onGoingHealthcheck
});

export default connect(mapStateToProps)(HomeScreen);
