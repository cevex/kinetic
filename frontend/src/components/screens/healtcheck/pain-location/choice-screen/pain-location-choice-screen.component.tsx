import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import I18n from '../../../../i18n';
import KntButton from '../../../../ui/actions/button/button.component';
import { PainLocationChoiceScreenState } from './pain-location-choice-screen.model';
import { PainLocationChoiceScreenService } from './pain-location-choice-screen.service';
import styles from './pain-location-choice-screen.style';

class PainLocationChoiceScreen extends Component<any, PainLocationChoiceScreenState> {
    constructor(props: void) {
        super(props);
        this.state = PainLocationChoiceScreenService.initScreen();
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.imagesContainer}
                    source={require('../../../../../assets/images/body-map-back__back-left.png')}
                />

                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{this.state.focusArea.name}</Text>
                    <Text style={styles.modalLabel}>{this.state.focusArea.details}</Text>

                    <View style={styles.controls}>
                        <View style={styles.controlsPagination}>
                            <KntButton
                                label={I18n.t('pain.area.previous')}
                                style={styles.controlsPaginationButton}
                                type="secondary"
                                onPress={() =>
                                    this.setState(
                                        PainLocationChoiceScreenService.goPrevious(this.state)
                                    )
                                }
                            />
                            <KntButton
                                label={I18n.t('pain.area.next')}
                                style={styles.controlsPaginationButton}
                                type="secondary"
                                onPress={() =>
                                    this.setState(
                                        PainLocationChoiceScreenService.goNext(this.state)
                                    )
                                }
                            />
                        </View>
                        <KntButton
                            label={I18n.t('navigation.close')}
                            type="secondary"
                            fitWith={true}
                            onPress={_ => this.props.navigation.navigate('PainLocation')}
                        />
                        <KntButton
                            key={this.state.focusAreaSelected ? 'remove' : 'select'}
                            label={
                                this.state.focusAreaSelected
                                    ? I18n.t('pain.area.remove')
                                    : I18n.t('pain.area.select')
                            }
                            type={this.state.focusAreaSelected ? 'accentuate' : 'primary'}
                            fitWith={true}
                            onPress={() =>
                                this.setState(
                                    PainLocationChoiceScreenService.toggleAreaSelection(this.state)
                                )
                            }
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default PainLocationChoiceScreen;
