import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import KntButton from '../../../../ui/button/button.component';
import I18n from '../../../../i18n';
import { globalVariables } from '../../../../styles';
import { PainLocationChoiceScreenState } from './pain-location-choice-screen.model';
import { PainLocationChoiceScreenService } from './pain-location-choice-screen.service';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: globalVariables.color.white
    },
    imagesContainer: {
        flex: 1,
        width: '100%'
    },
    modalContainer: {
        position: 'absolute',
        left: '3%',
        bottom: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        borderRadius: 5,
        padding: 15,
        backgroundColor: globalVariables.color.white
    },
    modalTitle: {
        color: globalVariables.color.primary,
        fontSize: globalVariables.fontSize.xbig,
        fontWeight: '600',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginBottom: 15
    },
    modalLabel: {
        color: globalVariables.color.primaryLight,
        fontSize: globalVariables.fontSize.medium,
        fontWeight: '600',
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 15
    },
    controls: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%'
    },
    controlsPagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    controlsPaginationButton: {
        flex: 1,
        margin: 0
    }
});

export default PainLocationChoiceScreen;
