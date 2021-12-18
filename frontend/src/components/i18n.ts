import I18n, { getLanguages } from 'react-native-i18n';
import en from '../assets/i18n/en';
import fr from '../assets/i18n/fr';

I18n.fallbacks = true;
I18n.defaultLocale = 'en';
I18n.translations = {
    en: en,
    'en-US': en,
    fr: fr
};

getLanguages().then(languages => {
    console.log('Languages : ', languages); // ['en-US', 'en']
});

export default I18n;
