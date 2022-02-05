import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { PainAssessChoiceTripleType } from '../../../../core/domain/healthcheck-task/choice/pain-assessment-choice.model';
import { HealthcheckActionner } from '../../../../core/store/healthcheck/healthcheck.actions';
import { KineticState } from '../../../../core/store/kinetic.state';
import { ScreenProp } from '../../../common/navigable-screen-prop.model';
import I18n from '../../../i18n';
import { globalStyles, globalVariables } from '../../../styles';
import KntButton from '../../../ui/button/button.component';
import { UiItem } from '../../../ui/core/ui-item.model';
import KntSelectFlat from '../../../ui/selects/select-flat.component';
import YoutubePlayer from '../../../ui/youtube-player.component';
import { ExerciseScreenState } from './exercise-screen.model';
import { ExerciseScreenService } from './exercise-screen.service';

interface ExerciseScreenProp extends ScreenProp {
    taskId: string;
    assessExercise: (choiceType: PainAssessChoiceTripleType) => void;
}

class ExerciseScreen extends Component<ExerciseScreenProp, ExerciseScreenState> {
    constructor(props: ExerciseScreenProp) {
        super(props);
        this.state = ExerciseScreenService.initScreen(this.props.taskId);
    }

    componentDidUpdate(
        prevProps: Readonly<ExerciseScreenProp>,
        prevState: Readonly<ExerciseScreenState>
    ) {
        if (prevProps.taskId !== this.props.taskId) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(ExerciseScreenService.initScreen(this.props.taskId));
        }
    }

    private onStateChange = (state: string) => {
        if (state === 'ended') {
            // console.log('Video is ending');
        }
    };

    private togglePlaying = () => {
        // console.log('togglePlaying');
    };

    private validateAssessment() {
        if (!this.state.selectedChoice) return;
        const choice = this.state.selectedChoice.id as PainAssessChoiceTripleType;
        this.props.assessExercise(choice);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={globalStyles.card}>
                    <Text style={globalStyles.cardTitle}>{this.state.exercise?.name}</Text>
                    <Text style={globalStyles.cardMessage}>{I18n.t('exercise.advice')}</Text>
                </View>

                <View style={styles.videoPlayer}>
                    <YoutubePlayer
                        videoId={this.state.exercise?.videoId}
                        playing={true}
                        onPlayChange={event => {
                            // console.log('YoutubePlayer onPlayChange : ', event);
                        }}
                    />
                    <Text style={globalStyles.cardMessage}>{this.state.exercise?.advice}</Text>
                </View>
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
                    onPress={() => this.validateAssessment()}
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
    videoPlayer: {
        width: '90%',
        borderRadius: 10,
        overflow: 'hidden'
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

const mapStateToProps = (state: KineticState) => ({
    taskId: state.onGoingHealthcheck.taskId
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    assessExercise: (choiceType: PainAssessChoiceTripleType) => {
        dispatch(HealthcheckActionner.assessExercise(choiceType));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseScreen);
