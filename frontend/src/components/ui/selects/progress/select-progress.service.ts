import { globalVariables } from '../../../styles';

export declare type SelectProgressStatus = 'validated' | 'not-validated' | 'empty' | 'highlighted';

export interface SelectProgressStyle {
    textColor: string;
    backgroundColor: string;
    borderColor?: string;
}

export class SelectProgressService {
    public static getButtonStyle(status: SelectProgressStatus): SelectProgressStyle {
        switch (status) {
            case 'validated':
                return this.getValidatedButton();
            case 'not-validated':
                return this.getNonValidatedButton();
            case 'highlighted':
                return this.getHighlightedButton();
            case 'empty':
            default:
                return this.getEmptyButton();
        }
    }

    private static getValidatedButton(): SelectProgressStyle {
        return {
            backgroundColor: globalVariables.color.success,
            textColor: globalVariables.color.dark
        };
    }

    private static getNonValidatedButton(): SelectProgressStyle {
        return {
            backgroundColor: globalVariables.color.danger.light,
            textColor: globalVariables.color.dark
        };
    }

    private static getEmptyButton(): SelectProgressStyle {
        return {
            backgroundColor: globalVariables.color.primaryBackground,
            textColor: globalVariables.color.primary
        };
    }

    private static getHighlightedButton(): SelectProgressStyle {
        return {
            backgroundColor: globalVariables.color.primary,
            textColor: globalVariables.color.white
        };
    }
}
