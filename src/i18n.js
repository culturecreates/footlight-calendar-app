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
          "StartTime":"Heure de début",
          "PlaceName":"Place Name",
          "Country":"Country",
          "Locality":"Locality",
          "PostalCode":"Postal Code",
          "Street Address":"Street Address",
          "ContainedInPlace":"Contained In Place",
          "AddPlace":"Add Place",
          "EndDateTime":"End Date Time",
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
            "Online":"Evenement Virtuelle",
            "Offline":"Evenement hors-ligne",
          "Hybrid":"Event Hybride",
          "Event":"Evenement",
          "Powered":"Propulsé par",
          "CopyReserve":"Tous droits réservés",
          "headerText":"CALENDRIER CULTUREL OUTAOUAIS",
          "to":"au",
          "tickets":"Billets",
          "Events":"Evenements",
          "Places":"Lieu",
          "AddEvent":"Ajouter Evenement",
          "Name":"Nom",
          "Location":"Emplacement",
          "StartDate":"Date de Début",
          "Published":"Publié",
          "FileUpload":"Sélectionnez les fichiers à télécharger",
          "DragAndDrop":"ou glisser-déposer des fichiers à télécharger",
          "EndDate":"Date de fin",
          "EndTime":"Heure de finFin",
          "StartTime":"Heure de finFin",
          "PlaceName":"Toponymie",
          "Country":"Pays",
          "Locality":"Localité",
          "PostalCode":"Code postal",
          "Street Address":"Adresse municipale",
          "ContainedInPlace":"Contenu en place",
          "AddPlace":"Ajouter un lieu",
          "EndDateTime":"Date de fin Heure"

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
