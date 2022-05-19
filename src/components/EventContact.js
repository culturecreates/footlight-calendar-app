import React from "react";
import { Calendar } from "antd";
import PropTypes from "prop-types";
import "../App.css";
import { useTranslation, Trans } from "react-i18next";

const EventContact = function ({ name, values,currentLang }) {
    const { t, i18n } = useTranslation();

 
  return (
    <div className="event-contact-card">
      <div className="filter-type">{t(name, { lng: currentLang })}</div>
      {values.map(item=>
      <div className="event-contact-details">{name === "type"?item:item.name[currentLang]}</div>
      )}
    </div>
  );
};
export default EventContact;

EventContact.propTypes = {
  onClose: PropTypes.func,
};
