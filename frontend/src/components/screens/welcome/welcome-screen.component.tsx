import React, { Component } from 'react';
import { GestureResponderEvent, Image, StyleSheet, Text, View } from 'react-native';
import { ScreenProp } from '../../common/navigation/navigable-screen-prop.model';
import KntBreadcrumb from '../../common/ui/breadcrumb.component';
import KntButton from '../../common/ui/button/button.component';
import { ButtonType } from '../../common/ui/button/button.model';
import I18n from '../../i18n';
import { globalVariables } from '../../styles';
import { WelcomeScreenState } from './welcome-screen.model';
import { WelcomeScreenService } from './welcome-screen.service';

interface WelcomeScreenProp extends ScreenProp {
    label: string;
    type?: ButtonType;
    onPress: ((event?: GestureResponderEvent) => void) | undefined;
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
                    {this.state.showStart && (
                        <KntButton
                            label={'👉 ' + I18n.t('healthcheck.start')}
                            type="link"
                            onPress={() => this.props.navigation.navigate('PainLocation')}
                        />
                    )}
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
        backgroundColor: globalVariables.color.bg
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

export default WelcomeScreen;
