import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          
          "Region": "REGIONS",
          "Types": "TYPES",
          "Publics" : "PUBLICS",
          welcome: "Hello  <strong>World</strong>"
        }
      },
      de: {
        translations: {
          "Types": "Types",
            "Region": "Regions",
            "Publics" : "PUBLICS",
        }
      }
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;