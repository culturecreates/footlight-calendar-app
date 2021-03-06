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
          organizations:"Organizations",
          "Email":"Email",
          "Region": "Province",
          "Types": "TYPES",
          "Type": "Type",
          "Publics" : "AUDIENCES",
          "Remove" : "Remove all search criteria",
          "AllEvents": "All Events",
          "Search": "Search for an event, theme, venue",
          "audiences":"Audiences",
          "additionalType":"Additional Type",
          "Results":"Search Results",
          "audience":"Audience",
          "Different": "diiferent",
          "Contact":"Contact",
          "Contacts":"Contacts",
          "AddContact":"Add contact",
          "offers":"Price",
          "iCal": "RECORD",
          "socialLink":"SHARE",
          "Online":"Event Online",
          "Offline":"Event Offline",
          "Hybrid":"Event Hybrid",
          "Event":"Event",
          "Events":"Events",
          "AddEvent":"Add event",
          "Powered":"Powered by",
          "CopyReserve":"All rights reserved",
          "headerText":"OUTAOUAIS CULTURAL CALENDAR",
          "to":"to",
          "tickets":"Tickets",
          "Place":"Place",
          "Places":"Places",
          "AddPlace":"Add place",
          "Name":"Name",
          "Location":"Location",
          "StartDate":"Start Date",
          "Title":"Title",
          "Published":"Published",
          "FileUpload":"Select Files to upload",
          "DragAndDrop":"or Drag and Drop files to upload",
          "EndDate":"End Date",
          "EndTime":"End Time",
          "StartTime":"Start Time",
          "PlaceName":"Name",
          "Country":"Country",
          "Locality":"City",
          "PostalCode":"Postal Code",
          "StreetAddress":"Street Address",
          "ContainedInPlace":"Contained In Place",
          "EndDateTime":"End Date Time",
          "RecurringEvent":"Recurring Event",
          "Frequency":"Frequency",
          "Free":"Free"
        }
      },
      fr: {
        translations: {
          "Free":"Gratuit",
          organizations:"Presente par",
          "Email":"Courriel",
          "Frequency":"Fr??quence",
          "RecurringEvent":"??v??nement R??current",
          "Types": "Types",
          "Type": "Type",
          "Region": "Province",
          "Publics" : "PUBLICS",
          "Remove" : "Retirer tous les crit??res de recherche",
          "AllEvents": "Tous les ??v??nements",
          "audiences":"Publics",
          "audience":"Public",
          "additionalType":"Additional Type",
          "Search": "Recherchez un ??v??nement, un th??me ou un lieu",
          "Results":"R??sultats de recherche",
          "Different": "autres",
          "Contact":"Contact",
          "Contacts":"Contacts",
          "AddContact":"Ajoutez un contact",
          "offers":"Prix",
          "iCal": "ENREGISTRER",
          "socialLink":"PARTAGER",
          "Online":"??v??nement virtuelle",
          "Offline":"??v??nement hors-ligne",
          "Hybrid":"??v??nement hybride",
          "Event":"??v??nement",
          "Events":"??v??nements",
          "AddEvent":"Ajoutez un ??v??nement",
          "Powered":"Propuls?? par",
          "CopyReserve":"Tous droits r??serv??s",
          "headerText":"CALENDRIER CULTUREL OUTAOUAIS",
          "to":"au",
          "tickets":"Billets",
          "Place":"Lieu",
          "Places":"Lieux",
          "AddPlace":"Ajoutez un lieu",
          "Name":"Nom",
          "Location":"Emplacement",
          "StartDate":"Date de d??but",
          "Title":"Titre",
          "Published":"Publi??",
          "FileUpload":"S??lectionnez les fichiers ?? t??l??charger",
          "DragAndDrop":"ou glisser-d??poser des fichiers ?? t??l??charger",
          "EndDate":"Date de fin",
          "EndTime":"Heure de fin",
          "StartTime":"Heure de d??but",
          "PlaceName":"Nom",
          "Country":"Pays",
          "Locality":"Ville",
          "PostalCode":"Code postal",
          "StreetAddress":"Adresse municipale",
          "ContainedInPlace":"Contenu en place",
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
