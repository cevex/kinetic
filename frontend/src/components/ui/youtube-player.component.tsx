import React, { Component } from 'react';
import { View } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

interface YoutubePlayerProp {
    videoId: string;
    playing: boolean;
    onPlayChange: (playing: boolean) => void;
}

class KntYoutubePlayer extends Component<YoutubePlayerProp> {
    private onStateChange = (state: string) => {
        if (state === 'ended') {
            this.props.onPlayChange(false);
        }
    };

    render() {
        return (
            <View style={{ width: '100%' }}>
                <YoutubeIframe
                    height={300}
                    initialPlayerParams={{
                        controls: false, // No controls
                        preventFullScreen: false, // Allow full screen
                        showClosedCaptions: false,
                        modestbranding: true, // Small youtube logo
                        iv_load_policy: 3, // No annotation
                        rel: false // No suggestion
                    }}
                    play={this.props.playing}
                    videoId={this.props.videoId}
                    onChangeState={this.onStateChange}
                />
            </View>
        );
    }
}

export default KntYoutubePlayer;
