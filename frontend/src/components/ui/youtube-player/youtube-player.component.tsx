import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Logger } from '../../../core/common/log.service';
import { globalVariables } from '../../styles';
import { PlayerLoadingStateType, YoutubePlayerState } from './youtube-player.model';
import styles from './youtube-player.style';

interface YoutubePlayerProp {
    videoId: string;
    playing: boolean;
    onPlayChange?: (playing: boolean) => void;
}

class KntYoutubePlayer extends Component<YoutubePlayerProp, YoutubePlayerState> {
    constructor(props: YoutubePlayerProp) {
        super(props);
        this.state = {
            loadingState: 'unstarted'
        };
    }

    private onStateChange = (state: string) => {
        Logger.log('[KntYoutubePlayer] ', state);
        this.setState({
            loadingState: state as PlayerLoadingStateType
        });
    };

    private isLoading(): boolean {
        return this.state.loadingState === 'unstarted';
    }

    render() {
        return (
            <View style={styles.container}>
                {this.isLoading() && (
                    <ActivityIndicator size="large" color={globalVariables.color.primary} />
                )}
                <View style={{ display: this.isLoading() ? 'none' : 'flex' }}>
                    <YoutubePlayer
                        height={200}
                        play={true}
                        videoId={this.props.videoId}
                        initialPlayerParams={{
                            controls: false, // No controls
                            preventFullScreen: false, // Allow full screen
                            showClosedCaptions: false,
                            modestbranding: true, // Small youtube logo
                            iv_load_policy: 3, // No annotation
                            rel: false // No suggestion (Not working : google stop handling it...)
                        }}
                        onChangeState={e => this.onStateChange(e)}
                    />
                </View>
            </View>
        );
    }
}

export default KntYoutubePlayer;
