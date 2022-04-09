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
import { UiItem } from '../../../ui/core/ui-item.model';
import KntSelectFlat from '../../../ui/selects/flat/select-flat.component';
import KntYoutubePlayer from '../../../ui/youtube-player.component';
import { ExerciseScreenState } from './healthcheck-exercise-screen.model';
import { HealthcheckExerciseScreenService } from './healthcheck-exercise-screen.service';
import styles from './healthcheck-exercise-screen.style';

interface ExerciseScreenProp extends ScreenProp {
    taskId: string;
    assessExercise: (choiceType: PainAssessChoiceTripleType) => void;
}

class HealthcheckExerciseScreen extends Component<ExerciseScreenProp, ExerciseScreenState> {
    constructor(props: ExerciseScreenProp) {
        super(props);
        this.state = HealthcheckExerciseScreenService.initScreen(this.props.taskId);
    }

    componentDidUpdate(
        prevProps: Readonly<ExerciseScreenProp>,
        prevState: Readonly<ExerciseScreenState>
    ) {
        if (prevProps.taskId !== this.props.taskId) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(HealthcheckExerciseScreenService.initScreen(this.props.taskId));
        }
    }

    private validateAssessment() {
        if (!this.state.selectedChoice) return;
        const choice = this.state.selectedChoice.id as PainAssessChoiceTripleType;
        this.props.assessExercise(choice);
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
                <KntSelectFlat
                    style={styles.assessment}
                    items={this.state.choices}
                    selectedItemId={this.state.selectedChoice?.id}
                    onSelected={(item: UiItem) => {
                        this.setState(
                            HealthcheckExerciseScreenService.selectAssessments(this.state, item)
                        );
                    }}
                />

                <KntButton
                    label={I18n.t('global.validate')}
                    type="primary"
                    style={styles.controls}
                    disabled={!this.state.selectedChoice}
                    onPress={() => this.validateAssessment()}
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
)(HealthcheckExerciseScreen);
