// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations for different languages
import enTranslation from "./locales/en.json";
import vnTranslation from "./locales/vn.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  vn: {
    translation: vnTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Set the default language here
  keySeparator: false, // Allow accessing nested keys with dots
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
