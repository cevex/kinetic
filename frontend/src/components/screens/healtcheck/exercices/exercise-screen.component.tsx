import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScreenProp } from '../../../common/navigable-screen-prop.model';
import I18n from '../../../i18n';
import { globalStyles, globalVariables } from '../../../styles';
import KntButton from '../../../ui/button/button.component';
import { UiItem } from '../../../ui/core/ui-item.model';
import KntSelectFlat from '../../../ui/selects/select-flat.component';
import { ExerciseScreenState } from './exercise-screen.model';
import { ExerciseScreenService } from './exercise-screen.service';

class ExerciseScreen extends Component<ScreenProp, ExerciseScreenState> {
    constructor(props: ScreenProp) {
        super(props);
        this.state = ExerciseScreenService.initScreen('dual');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={globalStyles.card}>
                    <Text style={globalStyles.cardTitle}>Posture : debout</Text>
                    <Text style={globalStyles.cardMessage}>{I18n.t('exercise.advice')}</Text>
                </View>
                <Image
                    style={styles.video}
                    source={require('../../../../assets/images/execise__video.png')}
                />

                <KntSelectFlat
                    style={styles.assessment}
                    items={this.state.choices}
                    selectedItemId={this.state.selectedChoice?.id}
                    onSelected={(item: UiItem) => {
                        this.setState(ExerciseScreenService.selectAssessments(this.state, item));
                    }}
                />

                <KntButton
                    label={I18n.t('global.validate')}
                    type="primary"
                    style={styles.controls}
                    disabled={!this.state.selectedChoice}
                    onPress={() => this.props.navigation.navigate('PainLocation')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalVariables.color.grey.xlight,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    video: {
        flex: 2
    },
    assessment: {
        flex: 2,
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 15
    },
    controls: {
        width: '90%',
        marginBottom: 15
    }
});

export default ExerciseScreen;
