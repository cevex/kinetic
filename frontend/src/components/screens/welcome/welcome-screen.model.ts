export interface WelcomeScreenState {
    stepIndex: number;
    message: GuideMessage;

    nbSteps: number;
    showNext: boolean;
    showPrevious: boolean;
    showStart: boolean;
}

export interface GuideMessage {
    id: string;
    title: string;
    label: string;
    icon?: any;
}
