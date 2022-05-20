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
          
          "Region": "REGION",
          "Types": "TYPES",
          "Publics" : "PUBLICS",
          "Remove" : "Remove all search criteria",
          "Contact" :"Contact",
          "AllEvents": "All Events",
          "Search": "Search for an event, theme, venue",
          "audiences":"Audiences",
          "additionalType":"Additional Type",
          "Results":"Search Results",
          "audience":"Audience",
          "Type": "Type",
          "Different": "diiferent",
          welcome: "Hello  <strong>World</strong>"
        }
      },
      fr: {
        translations: {
            "Types": "Types",
            "Type": "Type",
            "Region": "OUTAOUAIS",
            "Publics" : "PUBLICS",
            "Remove" : "Retirer tous les critères de recherche",
            "Contact" :"Contact",
            "AllEvents": "Tous les événements",
            "audiences":"Audiences",
            "audience":"Audience",
            "additionalType":"Additional Type",
            "Search": "Recherchez un événement, un thème ou un lieu",
            "Results":"Résultats de recherche",
            "Different": "auture",
        }
      }
    },
    fallbackLng: "fr",
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
