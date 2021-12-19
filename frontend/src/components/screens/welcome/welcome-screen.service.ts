import I18n from '../../i18n';
import { GuideMessage, WelcomeScreenState } from './welcome-screen.model';

export class WelcomeScreenService {
    private static guideMessages: GuideMessage[] = [
        {
            id: 'first',
            title: I18n.t('welcome.guide.first.title'),
            label: I18n.t('welcome.guide.first.label'),
            icon: require('../../../assets/images/guide1.png')
        },
        {
            id: 'second',
            title: I18n.t('welcome.guide.third.title'),
            label: I18n.t('welcome.guide.third.label'),
            icon: require('../../../assets/images/guide2.png')
        },
        {
            id: 'second',
            title: I18n.t('welcome.guide.third.title'),
            label: I18n.t('welcome.guide.third.label'),
            icon: require('../../../assets/images/guide3.png')
        }
    ];

    // ===============================================================
    //              State management
    // ===============================================================

    public static initWelcomeScreen(index: number): WelcomeScreenState {
        return {
            message: this.guideMessages[index],
            stepIndex: index,
            nbSteps: this.guideMessages.length,
            showPrevious: index > 0 && index < this.guideMessages.length,
            showNext: index < this.guideMessages.length - 1,
            showStart: this.isLastMessage(index)
        };
    }

    public static goNext(currentState: WelcomeScreenState): WelcomeScreenState {
        const newIndex = this.incrementIndex(currentState.stepIndex);
        return this.initWelcomeScreen(newIndex);
    }

    public static goPrevious(currentState: WelcomeScreenState): WelcomeScreenState {
        const newIndex = this.decrementIndex(currentState.stepIndex);
        return this.initWelcomeScreen(newIndex);
    }

    // ===============================================================
    //              Index management
    // ===============================================================

    private static incrementIndex(index: number): number {
        if (this.isLastMessage(index)) return index;
        return index + 1;
    }

    private static decrementIndex(index: number): number {
        if (this.isFirstMessage(index)) return index;
        return index - 1;
    }

    private static isFirstMessage(index: number) {
        return !index || index === 0;
    }

    private static isLastMessage(index: number) {
        return index === this.guideMessages.length - 1;
    }
}
