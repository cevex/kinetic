import { PaginatorService } from '../../../core/common/paginator.service';
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
            title: I18n.t('welcome.guide.second.title'),
            label: I18n.t('welcome.guide.second.label'),
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
            showStart: PaginatorService.isLastIndex(this.guideMessages, index)
        };
    }

    public static goNext(currentState: WelcomeScreenState): WelcomeScreenState {
        const newIndex = PaginatorService.incrementIndex(
            this.guideMessages,
            currentState.stepIndex
        );
        return this.initWelcomeScreen(newIndex);
    }

    public static goPrevious(currentState: WelcomeScreenState): WelcomeScreenState {
        const newIndex = PaginatorService.decrementIndex(currentState.stepIndex);
        return this.initWelcomeScreen(newIndex);
    }
}
