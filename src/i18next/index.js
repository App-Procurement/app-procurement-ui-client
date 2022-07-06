import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import http from "i18next-http-backend";
import translationsEN from "./translation/en..json";
import translationFR from "./translation/fr.json"
i18n.use(http).use(LanguageDetector).init({
    debug: false,
    lng: "en",
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: {
            translations: translationsEN
        },
        fr: {
            translations: translationFR
        }
    },
    ns: ["translations"],
    defaultNS: "translations",
    nsSeparator: "|"
});
export default i18n;
