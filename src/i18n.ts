import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

import translationEN from './locales/en/translation.json';
import translationUA from './locales/ua/translation.json';

i18n.use(Backend).use(initReactI18next).init({
    fallbackLng: localStorage.getItem('lang') || 'ua',
    debug: false,
    detection: {
        order: ['queryString', 'cookie', 'localStorage'],
        caches: ['cookie'],
    },
    resources: {
        en: {
            translation: translationEN,
        },
        ua: {
            translation: translationUA,
        },
    },
    react: {
        bindI18n: 'languageChanged',
        bindI18nStore: '',
        transEmptyNodeValue: '',
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'span', 'b', 'ol', 'li', 'ul', 'a'],
        useSuspense: false,
    },
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;