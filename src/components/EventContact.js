import React from "react";
import PropTypes from "prop-types";
import "../App.css";
import { useTranslation } from "react-i18next";

const EventContact = function ({ name, values,currentLang }) {
    const { t } = useTranslation();

 
  return (
    <div className="event-contact-card">
      <div className="filter-type">{t(name, { lng: currentLang })}</div>
      {name === "contact"?
      <div className="contact-address">
        {values.name[currentLang]}<br/>
        <a>{values.email}</a><br/>
        <a>{values.telephone}</a><br/>
        <a>{values.url?.uri}</a><br/>
      </div>:
      values.map(item=>
        <>
      
      {name === "Link"?
      // <div className="event-contact-details">{item}</div>
      <a href={item} target="_blank" rel="noreferrer" className="contact-address">{item}</a>

      :
      <div className="event-contact-details">{name === "type"?item:item.name&&item.name[currentLang]}</div>}
      {name === "offers" && item.price &&  
      <div className="event-price">
        {t("offers", { lng: currentLang })}:{item.price}&nbsp;{item.priceCurrency}
      </div>
}
      </>
      )}
    </div>
  );
};
export default EventContact;

EventContact.propTypes = {
  onClose: PropTypes.func,
};
