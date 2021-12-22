import { globalVariables } from '../../../styles';
import { ButtonState, ButtonType } from './button.model';

export class ButtonService {
    public static initState(buttonType: ButtonType | undefined): ButtonState {
        switch (buttonType) {
            case 'secondary':
                return this.getSecondaryButton();
            case 'accentuate':
                return this.getAccentButton();
            case 'link':
                return this.getLinkButton();
            case 'primary':
            default:
                return this.getPrimaryButton();
        }
    }

    private static getPrimaryButton() {
        return {
            backgroundColor: globalVariables.color.primary,
            textColor: globalVariables.color.bg,
            borderColor: globalVariables.color.primary
        };
    }

    private static getSecondaryButton() {
        return {
            backgroundColor: globalVariables.color.bg,
            textColor: globalVariables.color.primary,
            borderColor: globalVariables.color.primary
        };
    }

    private static getAccentButton() {
        return {
            backgroundColor: globalVariables.color.accent,
            textColor: globalVariables.color.bg,
            borderColor: globalVariables.color.bg
        };
    }

    private static getLinkButton() {
        return {
            backgroundColor: globalVariables.color.bg,
            textColor: globalVariables.color.primary,
            borderColor: globalVariables.color.bg
        };
    }
}
