import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import commonEn from './_resources/common.en.json';
import commonDe from './_resources/common.de.json';
import healtgEn from './_resources/health.en.json';
import healthDe from './_resources/health.de.json';

const resources = {
  en: {
    common: commonEn,
    health: healtgEn,
  },
  de: {
    common: commonDe,
    health: healthDe,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
