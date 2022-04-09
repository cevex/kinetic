import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Healthcheck } from '../../../../core/domain/healthcheck/healthcheck.model';
import { HealthcheckActionner } from '../../../../core/store/healthcheck/healthcheck.actions';
import { KineticState } from '../../../../core/store/kinetic.state';
import { ScreenProp } from '../../../common/navigable-screen-prop.model';
import I18n from '../../../i18n';
import { globalStyles } from '../../../styles';
import KntButton from '../../../ui/button/button.component';
import KntYoutubePlayer from '../../../ui/youtube-player.component';
import { HealthcheckRedoScreenState } from './healthcheck-redo-screen.model';
import { HealthcheckRedoScreenService } from './healthcheck-redo-screen.service';
import styles from './healthcheck-redo-screen.style';

interface HealthcheckRedoScreenProp extends ScreenProp {
    healthcheck: Healthcheck;
    redoExercise: () => void;
}

class HealthcheckRedoScreen extends Component<
    HealthcheckRedoScreenProp,
    HealthcheckRedoScreenState
> {
    constructor(props: HealthcheckRedoScreenProp) {
        super(props);
        this.state = HealthcheckRedoScreenService.initScreen(this.props.healthcheck);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <View style={globalStyles.card}>
                        <Text style={globalStyles.cardTitle}>
                            {this.state.exerciseAdditional
                                ? this.state.exerciseAdditional.label
                                : I18n.t('healthcheck.redo.title')}
                        </Text>
                        <Text style={globalStyles.cardMessage}>
                            {I18n.t('healthcheck.redo.label')}
                        </Text>
                        <Text style={globalStyles.cardMessage}>
                            {this.state.exerciseAdditional
                                ? this.state.exerciseAdditional.advice
                                : this.state.previousExercise.advice}
                        </Text>
                    </View>

                    {this.state.exerciseAdditional && (
                        <View style={styles.videoPlayer}>
                            <KntYoutubePlayer
                                videoId={this.state.exerciseAdditional.videoId}
                                playing={true}
                            />
                        </View>
                    )}
                </View>

                <KntButton
                    label={I18n.t('global.validate')}
                    type="primary"
                    style={styles.controls}
                    onPress={() => this.props.redoExercise()}
                />
            </View>
        );
    }
}

export default connect(
    (state: KineticState) => ({
        healthcheck: state.onGoingHealthcheck
    }),
    (dispatch: Dispatch) => ({
        redoExercise: () => {
            dispatch(HealthcheckActionner.redoExercise());
        }
    })
)(HealthcheckRedoScreen);
