import React from "react";
import { Button, Calendar } from "antd";
import PropTypes from "prop-types";
import "./EventDetails.css";
import { useParams } from "react-router-dom";
import EventContact from "../components/EventContact";
import { TwitterOutlined,FacebookFilled,GoogleOutlined,PrinterFilled,LeftOutlined } from '@ant-design/icons';
import { useTranslation, Trans } from "react-i18next";

const EventDetails = function ({ onSelection, value }) {
  const { t, i18n } = useTranslation();

  const { eventId } = useParams();
  return (
    <div>
      <div className="left-button"><LeftOutlined className="left-icon"/>{t("AllEvents")}</div>
      <div className="event-title">Rachid samri-hell0</div>
      <div className="event-title-section">
        <div className="event-time-section">
          <div className="event-time-header">hrrr</div>
          <div>hrrr</div>
          <div>hrrr</div>
        </div>
        <div>
          <div className="event-time-header">hrrr</div>
          <address>
            dddf <br /> dfdfgdg <br /> dsfdf
          </address>
        </div>
      </div>
      <div className="flex">
        <div className="image-and-contact">
          <div
            className="event-item"
            style={{
              backgroundImage: `url(https://cdn.caligram.com/uploads/event/8J5/medium/6242018236834.png)`,
            }}
          ></div>
              <Button type="primary" danger className="buy-button">
      Evenment Facebook
    </Button>
    <Button danger className="buy-button">Billets</Button>
   
          <EventContact/>
          <EventContact/>
          <EventContact/>
        </div>
        <div>
          <div className="event-detail-desc">À l’occasion de la Journée du poème à porter, une initiative de La poésie partout, qui a lieu le 28 avril, la Maison des arts littéraires a proposé à plusieurs poètes de la région de réfléchir à l’avenir avec leur art. Futurs possibles est une proposition de rencontre entre la poésie et les arts visuels qui met à contribution des artistes d’ici pour mettre en valeur la vitalité artistique et culturelle ainsi que le territoire de Gatineau. Une exposition de leurs poèmes-affiches étend sa toile dans la ville. Amusez-vous à les retrouver dans un parcours poétique à travers ses cinq secteurs.

Artistes par secteur

Secteur d’Aylmer : Christian Quesnel et José Claer
Secteur de Hull : Michelle Lapierre-Dallaire
Secteur de Gatineau : Alex Deschênes
Secteur de Masson-Angers : Michel Côté
Secteur de Buckingham : Marjolaine Beauchamp 

 

Ce projet est réalisé grâce au soutien de la Ville de Gatineau, de Hydro-Québec, de La poésie partout, du Café-Bar Aux 4 jeudi et de la librairie et galerie d’art Bouquinart, par la Maison des arts littéraires, une initative de diffusion portée par la Corporation du Salon du livre de l'Outaouais.
 </div>
 <Button type="primary" className="types-button">Types</Button>
 <div className="social-section">PARTAGER <span><TwitterOutlined className="social-icons"/> <GoogleOutlined className="social-icons"/><FacebookFilled className="social-icons"/>
 <PrinterFilled className="social-icons"/></span></div>
        </div>
      </div>
    </div>
  );
};
export default EventDetails;

EventDetails.propTypes = {
  onClose: PropTypes.func,
};
