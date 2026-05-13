import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import cs from "./locales/cs/translation.json";

i18n
    .use(initReactI18next)
    .init({
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: { translation: en},
            cs: { translation: cs}
        },
    });
export const t = i18n.t.bind(i18n);
