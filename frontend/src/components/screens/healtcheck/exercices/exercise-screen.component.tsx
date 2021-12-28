import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenProp } from '../../../common/navigable-screen-prop.model';
import I18n from '../../../i18n';
import { globalStyles, globalVariables } from '../../../styles';
import KntButton from '../../../ui/button/button.component';
import { UiItem } from '../../../ui/core/ui-item.model';
import KntSelectFlat from '../../../ui/selects/select-flat.component';
import YoutubePlayer from '../../../ui/youtube-player.component';
import { ExerciseScreenState } from './exercise-screen.model';
import { ExerciseScreenService } from './exercise-screen.service';

class ExerciseScreen extends Component<ScreenProp, ExerciseScreenState> {
    constructor(props: ScreenProp) {
        super(props);
        this.state = ExerciseScreenService.initScreen('dual');
    }

    private onStateChange = (state: string) => {
        if (state === 'ended') {
            console.log('Video is ending');
        }
    };

    private togglePlaying = () => {
        console.log('togglePlaying');
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={globalStyles.card}>
                    <Text style={globalStyles.cardTitle}>Posture : debout</Text>
                    <Text style={globalStyles.cardMessage}>{I18n.t('exercise.advice')}</Text>
                </View>

                <View style={styles.videoPlayer}>
                    <YoutubePlayer
                        videoId={'IZAJ3z8ItLM'}
                        // videoId={'KyQIuwLCVOY'}
                        playing={true}
                        onPlayChange={event => {
                            console.log('YoutubePlayer onPlayChange : ', event);
                        }}
                    />
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
                    onPress={() => this.props.navigation.navigate('Diagnosis')}
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

export default ExerciseScreen;
