import I18n, { getLanguages } from 'react-native-i18n';
import en from '../assets/i18n/en';
import fr from '../assets/i18n/fr';

export class I18nService {
    public static init() {
        I18n.fallbacks = true;
        I18n.defaultLocale = 'fr';
        I18n.translations = {
            en: en,
            fr: fr
        };
        I18n.locale = 'fr';
        getLanguages().then(userLanguages => {
            I18n.locale = 'fr';
            // I18n.locale = this.getValidatedLocale(userLanguages);
        });
    }

    private static getValidatedLocale(userLanguages: string[]) {
        const allowedUserLanguages = userLanguages
            .map(locale => locale.substring(0, 2))
            .filter(locale => Object.keys(I18n.translations).includes(locale));
        return allowedUserLanguages && allowedUserLanguages.length ? allowedUserLanguages[0] : 'fr';
    }
}

export default I18n;
