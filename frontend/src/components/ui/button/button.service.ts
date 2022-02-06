import { globalVariables } from '../../styles';
import { ButtonState, ButtonType } from './button.model';

export class ButtonService {
    public static initState(buttonType: ButtonType): ButtonState {
        switch (buttonType) {
            case 'secondary':
                return this.getSecondaryButton();
            case 'accentuate':
                return this.getAccentButton();
            case 'link':
                return this.getLinkButton();
            case 'success':
                return this.getSuccessButton();
            case 'primary':
            default:
                return this.getPrimaryButton();
        }
    }

    private static getPrimaryButton() {
        return {
            backgroundColor: globalVariables.color.primary,
            textColor: globalVariables.color.white,
            borderColor: globalVariables.color.primary
        };
    }

    private static getSecondaryButton() {
        return {
            backgroundColor: globalVariables.color.white,
            textColor: globalVariables.color.primary,
            borderColor: globalVariables.color.primary
        };
    }

    private static getAccentButton() {
        return {
            backgroundColor: globalVariables.color.accent,
            textColor: globalVariables.color.white,
            borderColor: globalVariables.color.white
        };
    }

    private static getLinkButton() {
        return {
            backgroundColor: globalVariables.color.white,
            textColor: globalVariables.color.primary,
            borderColor: globalVariables.color.white
        };
    }

    private static getSuccessButton() {
        return {
            backgroundColor: globalVariables.color.accent2,
            textColor: globalVariables.color.dark,
            borderColor: globalVariables.color.white
        };
    }
}
