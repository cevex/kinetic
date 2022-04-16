export declare type PlayerLoadingStateType = 'unstarted' | 'buffering' | 'playing' | 'ended';

export interface YoutubePlayerState {
    loadingState: PlayerLoadingStateType;
}
