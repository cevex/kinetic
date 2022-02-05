import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Healthcheck } from '../../../core/domain/healthcheck/healthcheck.model';
import { HealthcheckActionner } from '../../../core/store/healthcheck/healthcheck.actions';
import { KineticState } from '../../../core/store/kinetic.state';
import { ScreenProp } from '../../common/navigable-screen-prop.model';
import I18n from '../../i18n';
import { globalVariables } from '../../styles';
import KntBreadcrumb from '../../ui/breadcrumb.component';
import KntButton from '../../ui/button/button.component';
import { ButtonType } from '../../ui/button/button.model';
import { WelcomeScreenState } from './welcome-screen.model';
import { WelcomeScreenService } from './welcome-screen.service';

interface WelcomeScreenProp extends ScreenProp {
    label: string;
    type?: ButtonType;
    healthcheck: Healthcheck;
    startHealthcheck: () => void;
}

class WelcomeScreen extends Component<WelcomeScreenProp, WelcomeScreenState> {
    constructor(props: WelcomeScreenProp) {
        super(props);
        this.state = WelcomeScreenService.initWelcomeScreen(0);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imagesContainer}>
                    <Image source={this.state.message.icon} />
                </View>

                <KntBreadcrumb nbStep={this.state.nbSteps} selectedIndex={this.state.stepIndex} />

                <View style={styles.messageContainer}>
                    <Text style={styles.messageTitle}>{this.state.message.title}</Text>
                    <Text style={styles.messageLabel}>{this.state.message.label}</Text>
                </View>

                <View style={styles.controls}>
                    {this.state.showPrevious && (
                        <KntButton
                            label={I18n.t('navigation.previous')}
                            type="link"
                            onPress={() =>
                                this.setState(WelcomeScreenService.goPrevious(this.state))
                            }
                        />
                    )}
                    {this.state.showNext && (
                        <KntButton
                            label={I18n.t('navigation.next')}
                            type="link"
                            onPress={() => this.setState(WelcomeScreenService.goNext(this.state))}
                        />
                    )}
                    {/*{this.state.showStart && (*/}
                    <KntButton
                        label={'👉 ' + I18n.t('healthcheck.start')}
                        type="link"
                        onPress={() => this.props.startHealthcheck()}
                    />
                    {/*)}*/}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: globalVariables.color.white
    },
    imagesContainer: {
        margin: 20,
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    messageContainer: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    messageTitle: {
        color: globalVariables.color.primary,
        fontSize: globalVariables.fontSize.xbig,
        fontWeight: '600',
        margin: 10,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    messageLabel: {
        color: globalVariables.color.primaryLight,
        fontSize: globalVariables.fontSize.medium,
        margin: 10,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    controls: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const mapStateToProps = (state: KineticState) => ({
    healthcheck: state.onGoingHealthcheck
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    startHealthcheck: () => dispatch(HealthcheckActionner.startHealthcheck())
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
