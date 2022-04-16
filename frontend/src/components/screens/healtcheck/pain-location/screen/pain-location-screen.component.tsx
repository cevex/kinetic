import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BodyAreaType, BodyDirection } from '../../../../../core/domain/body/body-area-data.model';
import { Healthcheck } from '../../../../../core/domain/healthcheck/healthcheck.model';
import { HealthcheckActionner } from '../../../../../core/store/healthcheck/healthcheck.actions';
import { KineticState } from '../../../../../core/store/kinetic.state';
import { ScreenProp } from '../../../../common/navigable-screen-prop.model';
import I18n from '../../../../i18n';
import KntButton from '../../../../ui/actions/button/button.component';
import { UiItem } from '../../../../ui/core/ui-item.model';
import KntSelectSwitch from '../../../../ui/form/selects/switch/select-switch.component';
import PainLocationSelector from '../selector/pain-location-selector.component';
import { PainLocationScreenState } from './pain-location-screen.model';
import { PainLocationScreenService } from './pain-location-screen.service';
import styles from './pain-location-screen.style';

interface PainLocationScreenProp extends ScreenProp {
    healthcheck: Healthcheck;
    chooseLocation: (bodyAreas: BodyAreaType[]) => void;
}

class PainLocationScreen extends Component<PainLocationScreenProp, PainLocationScreenState> {
    constructor(props: PainLocationScreenProp) {
        super(props);
        this.state = PainLocationScreenService.initScreen('back');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.messageContainer}>
                    <Text style={styles.messageTitle}>{I18n.t('pain.area.selectPain')}</Text>
                    <KntSelectSwitch
                        items={this.state.directionOptions}
                        selectedItemId={this.state.selectedDirection}
                        onSelected={(item: UiItem) => {
                            this.setState(
                                PainLocationScreenService.setDirection(
                                    this.state,
                                    item.id as BodyDirection
                                )
                            );
                        }}
                    />
                </View>

                <View style={styles.imagesContainer}>
                    <PainLocationSelector
                        key={this.state.selectedDirection + '' + this.state.selectedAreas.join('#')}
                        bodyDirection={this.state.selectedDirection}
                        selectedAreas={this.state.selectedAreas}
                        onAreaSelection={(selectedAreas: BodyAreaType[]) => {
                            this.setState(
                                PainLocationScreenService.setSelectedAreas(
                                    this.state,
                                    selectedAreas
                                )
                            );
                        }}
                    />
                </View>

                <View style={styles.controls}>
                    <Text style={styles.adviceText}>{I18n.t('pain.area.touchAdvice')}</Text>
                    <KntButton
                        label={I18n.t('healthcheck.start')}
                        type="primary"
                        fitWith={true}
                        disabled={!this.state.selectedAreas || !this.state.selectedAreas.length}
                        onPress={_ => this.props.chooseLocation(this.state.selectedAreas)}
                    />
                </View>
            </View>
        );
    }
}

export default connect(
    (state: KineticState) => ({
        healthcheck: state.onGoingHealthcheck
    }),
    (dispatch: Dispatch) => ({
        chooseLocation: (bodyAreas: BodyAreaType[]) => {
            dispatch(HealthcheckActionner.chooseLocation(bodyAreas));
        }
    })
)(PainLocationScreen);
