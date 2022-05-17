import React from "react";
import { Calendar } from "antd";
import PropTypes from "prop-types";
import "../App.css";
import { useTranslation, Trans } from "react-i18next";

const EventContact = function ({ onSelection, value }) {
    const { t, i18n } = useTranslation();

  function onPanelChange(value) {
    onSelection(value)
  }
  return (
    <div className="event-contact-card">
      <div className="filter-type">{t("Contact")}</div>
      <div className="event-contact-details">test component</div>
    </div>
  );
};
export default EventContact;

EventContact.propTypes = {
  onClose: PropTypes.func,
};
