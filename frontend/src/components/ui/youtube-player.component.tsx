import React, { Component } from 'react';
import { View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

interface YoutubePlayerProp {
    videoId: string;
    playing: boolean;
    onPlayChange?: (playing: boolean) => void;
}

class KntYoutubePlayer extends Component<YoutubePlayerProp> {
    private onStateChange = (state: string) => {
        if (state === 'ended' && this.props.onPlayChange) {
            this.props.onPlayChange(false);
        }
    };

    render() {
        return (
            <View
                style={{
                    width: '100%',
                    borderRadius: 10,
                    overflow: 'hidden'
                }}>
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
                    onChangeState={this.onStateChange}
                />
            </View>
        );
    }
}

export default KntYoutubePlayer;
