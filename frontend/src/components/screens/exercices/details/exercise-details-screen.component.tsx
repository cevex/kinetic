import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { PainAssessChoiceTripleType } from '../../../../core/domain/healthcheck-task/choice/pain-assessment-choice.model';
import { HealthcheckActionner } from '../../../../core/store/healthcheck/healthcheck.actions';
import { KineticState } from '../../../../core/store/kinetic.state';
import { ScreenProp } from '../../../common/navigable-screen-prop.model';
import I18n from '../../../i18n';
import { globalStyles } from '../../../styles';
import KntButton from '../../../ui/button/button.component';
import KntYoutubePlayer from '../../../ui/youtube-player.component';
import { ExerciseDetailsState } from './exercise-details-screen.model';
import { ExerciseDetailsScreenService } from './exercise-details-screen.service';
import styles from './exercise-details-screen.style';

interface ExerciseDetailsScreenProp extends ScreenProp {
    taskId: string;
    assessExercise: (choiceType: PainAssessChoiceTripleType) => void;
}

class ExerciseDetailsScreen extends Component<ExerciseDetailsScreenProp, ExerciseDetailsState> {
    constructor(props: ExerciseDetailsScreenProp) {
        super(props);
        this.state = ExerciseDetailsScreenService.initScreen(this.props.route.params.exerciseId);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={globalStyles.card}>
                    <Text style={globalStyles.cardTitle}>{this.state.exercise?.label}</Text>
                    <Text style={globalStyles.cardMessage}>{I18n.t('exercise.advice')}</Text>
                </View>

                <View style={styles.videoPlayer}>
                    <KntYoutubePlayer videoId={this.state.exercise?.videoId} playing={true} />
                    <Text style={globalStyles.cardMessage}>{this.state.exercise?.advice}</Text>
                </View>
                <KntButton
                    label={I18n.t('global.validate')}
                    type="primary"
                    style={styles.controls}
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }
}

export default connect(
    (state: KineticState) => ({
        taskId: state.onGoingHealthcheck.taskId
    }),
    (dispatch: Dispatch) => ({
        assessExercise: (choiceType: PainAssessChoiceTripleType) => {
            dispatch(HealthcheckActionner.assessExercise(choiceType));
        }
    })
)(ExerciseDetailsScreen);
