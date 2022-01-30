import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Healthcheck } from '../../core/domain/healthcheck/healthcheck.model';
import { KineticState } from '../../core/store/kinetic.state';
import { ScreenProp } from '../common/navigable-screen-prop.model';
import I18n from '../i18n';
import { globalVariables } from '../styles';
import KntButton from '../ui/button/button.component';

export interface HomeScreenProp extends ScreenProp {
    healthcheck: Healthcheck;
    startHealthcheck: () => void;
}

class HomeScreen extends Component<HomeScreenProp> {
    constructor(props: HomeScreenProp) {
        super(props);
    }

    // componentDidUpdate(prevProps: Readonly<HomeScreenProp>, prevState: Readonly<any>) {
    //     console.log('[HomeScreen] componentDidUpdate !');
    // }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{I18n.t('welcome.title')}</Text>
                    <Image source={require('../../assets/images/kinetic-name.png')} />
                    <Image source={require('../../assets/images/kinetic-logo.png')} />
                </View>
                <View style={styles.controls}>
                    {this.props.healthcheck && this.props.healthcheck.treatmentStart && (
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalVariables.color.white,
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

const mapStateToProps = (state: KineticState) => ({
    healthcheck: state.healthcheck
});

export default connect(mapStateToProps)(HomeScreen);
