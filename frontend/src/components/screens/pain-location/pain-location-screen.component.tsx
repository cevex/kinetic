import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenProp } from '../../common/navigable-screen-prop.model';
import I18n from '../../i18n';
import { globalVariables } from '../../styles';
import KntButton from '../../ui/button/button.component';
import { UiItem } from '../../ui/core/ui-item.model';
import KntSelectSwitch from '../../ui/selects/select-switch.component';
import { PainLocationScreenState, SideType } from './pain-location-screen.model';
import { PainLocationScreenService } from './pain-location-screen.service';

class PainLocationScreen extends Component<ScreenProp, PainLocationScreenState> {
    constructor(props: ScreenProp) {
        super(props);
        this.state = PainLocationScreenService.initScreen('back');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.messageContainer}>
                    <Text style={styles.messageTitle}>{I18n.t('pain.area.selectPain')}</Text>
                    <KntSelectSwitch
                        items={this.state.sideOptions}
                        selectedItemId={this.state.selectedSideId}
                        onSelected={(item: UiItem) => {
                            this.setState(
                                PainLocationScreenService.initScreen(item.id as SideType)
                            );
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={styles.imagesContainer}
                    onPress={_ => this.props.navigation.navigate('PainLocationChoice')}>
                    <Image style={{ width: '100%' }} source={this.state.image} />
                </TouchableOpacity>

                <View style={styles.controls}>
                    <Text style={styles.adviceText}>{I18n.t('pain.area.touchAdvice')}</Text>
                    <KntButton
                        label={I18n.t('healthcheck.start')}
                        type="primary"
                        fitWith={true}
                        onPress={_ => this.props.navigation.navigate('HealthcheckGuide')}
                    />
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
    messageContainer: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%'
    },
    messageTitle: {
        color: globalVariables.color.primary,
        fontSize: globalVariables.fontSize.xbig,
        fontWeight: '600',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginBottom: 15
    },
    imagesContainer: {
        flex: 6,
        width: '40%'
    },
    images: {
        width: '80%'
    },
    controls: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%'
    },
    adviceText: {
        color: globalVariables.color.primary,
        fontSize: globalVariables.fontSize.medium,
        marginBottom: 10
    }
});

export default PainLocationScreen;
