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
          "Email":"Email",
          "Region": "REGION",
          "Types": "TYPES",
          "Type": "Type",
          "Publics" : "AUDIENCES",
          "Remove" : "Remove all search criteria",
          "Contact" :"Contact",
          "AllEvents": "All Events",
          "Search": "Search for an event, theme, venue",
          "audiences":"Audiences",
          "additionalType":"Additional Type",
          "Results":"Search Results",
          "audience":"Audience",
          "Different": "diiferent",
          "contact":"Contact",
          "offers":"Price",
          "iCal": "RECORD",
          "socialLink":"SHARE",
          "Online":"Event Online",
          "Offline":"Event Offline",
          "Hybrid":"Event Hybrid",
          "Event":"Event",
          "Powered":"Powered by",
          "CopyReserve":"All rights reserved",
          "headerText":"OUTAOUAIS CULTURAL CALENDAR",
          "to":"to",
          "tickets":"Tickets",
          "Events":"Events",
          "Places":"Places",
          "AddEvent":"Add Event",
          "Name":"Name",
          "Location":"Location",
          "StartDate":"Start Date",
          "Published":"Published",
          "FileUpload":"Select Files to upload",
          "DragAndDrop":"or Drag and Drop files to upload",
          "EndDate":"End Date",
          "EndTime":"End Time",
          "StartTime":"Start Time",
          "PlaceName":"Place Name",
          "Country":"Country",
          "Locality":"Locality",
          "PostalCode":"Postal Code",
          "StreetAddress":"Street Address",
          "ContainedInPlace":"Contained In Place",
          "AddPlace":"Add Place",
          "EndDateTime":"End Date Time",
          "RecurringEvent":"Recurring Event",
          "Frequency":"Frequency"
        }
      },
      fr: {
        translations: {
          "Email":"Courriel",
          "Frequency":"Fréquence",
          "RecurringEvent":"Événement Récurrent",
            "Types": "Types",
            "Type": "Type",
            "Region": "OUTAOUAIS",
            "Publics" : "PUBLICS",
            "Remove" : "Retirer tous les critères de recherche",
            "Contact" :"Contact",
            "AllEvents": "Tous les événements",
            "audiences":"Publics",
            "audience":"Public",
            "additionalType":"Additional Type",
            "Search": "Recherchez un événement, un thème ou un lieu",
            "Results":"Résultats de recherche",
            "Different": "auture",
            "contact":"Contact",
            "offers":"Prix",
            "iCal": "ENREGISTRER",
            "socialLink":"PARTAGER",
            "Online":"Événement virtuelle",
            "Offline":"Événement hors-ligne",
          "Hybrid":"Événement hybride",
          "Event":"Événement",
          "Powered":"Propulsé par",
          "CopyReserve":"Tous droits réservés",
          "headerText":"CALENDRIER CULTUREL OUTAOUAIS",
          "to":"au",
          "tickets":"Billets",
          "Events":"Événements",
          "Places":"Lieu",
          "AddEvent":"Ajouter un événement",
          "Name":"Nom",
          "Location":"Emplacement",
          "StartDate":"Date de début",
          "Published":"Publié",
          "FileUpload":"Sélectionnez les fichiers à télécharger",
          "DragAndDrop":"ou glisser-déposer des fichiers à télécharger",
          "EndDate":"Date de fin",
          "EndTime":"Heure de fin",
          "StartTime":"Heure de début",
          "PlaceName":"Lieu",
          "Country":"Pays",
          "Locality":"Région",
          "PostalCode":"Code postal",
          "StreetAddress":"Adresse municipale",
          "ContainedInPlace":"Contenu en place",
          "AddPlace":"Ajouter un lieu",
          "EndDateTime":"Date/heure de fin"
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
