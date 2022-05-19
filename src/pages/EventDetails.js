import React, { useEffect, useState } from "react";
import { Button, Calendar } from "antd";
import PropTypes from "prop-types";
import "./EventDetails.css";
import { useParams } from "react-router-dom";
import EventContact from "../components/EventContact";
import {
  TwitterOutlined,
  FacebookFilled,
  GoogleOutlined,
  PrinterFilled,
  LeftOutlined,
} from "@ant-design/icons";
import { useTranslation, Trans } from "react-i18next";
import ServiceApi from "../services/Service";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const EventDetails = function ({ currentLang }) {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [eventDetails, setEventDetails] = useState();
  const navigate = useNavigate();

  const { eventId } = useParams();
  useEffect(() => {
    getEventDetails(eventId);
  }, []);
  const getEventDetails = (id) => {
    setLoading(true);
    ServiceApi.getEventDetail(id)
      .then((response) => {
        if (response && response.data && response.data) {
          const events = response.data;
          setEventDetails(events);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  return (
    <div>
      <div className="left-button" onClick={() => navigate(`/`)}>
        <LeftOutlined className="left-icon" />
        {t("AllEvents")}
      </div>
      {eventDetails && (
        <>
          <div className="event-title">{eventDetails.name[currentLang]}</div>
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
                  backgroundImage: eventDetails?.image
                    ? `url(${eventDetails?.image?.uri})`
                    : `url(https://cdn.caligram.com/uploads/event/8J5/medium/6242018236834.png)`,
                }}
              ></div>
              <Button type="primary" danger className="buy-button">
                Evenment Facebook
              </Button>
              <Button danger className="buy-button">
                Billets
              </Button>

              <EventContact
                name="audience"
                values={eventDetails.audience}
                currentLang={currentLang}
              />
              {eventDetails.type?.length > 0 && (
                <EventContact
                  name="type"
                  values={eventDetails.type}
                  currentLang={currentLang}
                />
              )}
              {eventDetails.additionalType?.length > 0 && (
                <EventContact
                  name="additionalType"
                  values={eventDetails.additionalType}
                  currentLang={currentLang}
                />
              )}
            </div>
            <div>
              <div className="event-detail-desc">
                {eventDetails.description[currentLang]}
              </div>
              <Button type="primary" className="types-button">
                Types
              </Button>
              <div className="social-section">
                PARTAGER{" "}
                <span>
                  <TwitterOutlined className="social-icons" />{" "}
                  <GoogleOutlined className="social-icons" />
                  <FacebookFilled className="social-icons" />
                  <PrinterFilled className="social-icons" />
                </span>
              </div>
            </div>
          </div>
        </>
      )}
      {loading && <Spinner />}
    </div>
  );
};
export default EventDetails;

EventDetails.propTypes = {
  onClose: PropTypes.func,
};
