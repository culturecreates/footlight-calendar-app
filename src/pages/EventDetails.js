import React, { useEffect, useState } from "react";
import { Button, Menu, Dropdown, Space } from "antd";
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
  DownOutlined,
  TagsFilled,
} from "@ant-design/icons";
import { useTranslation, Trans } from "react-i18next";
import ServiceApi from "../services/Service";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";

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
  const menu = (
    <Menu
      items={eventDetails?.subEvents.map((item, index) => {
        const obj = {
          label:
            new Date(item.startDate).toLocaleDateString(currentLang, {
              weekday: "long",
            }) + moment(item.startDate).utc().format(" DD MMM YYYY"),
          key: index,
        };
        return obj;
      })}
    />
  );
  const getDiffernceinDates=(start,end)=>{
    const startDate = moment(start);
const timeEnd = moment(end);
const diff = timeEnd.diff(startDate);
const diffDuration = moment.duration(diff);
return diffDuration.hours() === 0? 24 : diffDuration.hours();
  }
  return (
    <div>
      <div className="left-button" onClick={() => navigate(`/`)}>
        <LeftOutlined className="left-icon" />
        {t("AllEvents", { lng: currentLang })}
      </div>
      {eventDetails && (
        <>
          <div className="event-title">{eventDetails.name[currentLang]}</div>
          <div className="event-title-section">
            <div className="event-time-section">
              <div className="event-time-header">
                {new Date(eventDetails.startDate).toLocaleDateString(
                  currentLang,
                  { weekday: "long" }
                ) + moment(eventDetails.startDate).utc().format(" DD MMM YYYY")}
              </div>
              <div>{getDiffernceinDates(eventDetails.startDate,eventDetails.endDate)} h</div>
              <div className="subevent-dropdown">
                {eventDetails.subEvents?.length>0 &&
                <>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <a className="sub-events" onClick={(e) => e.preventDefault()}>
                    <Space>
                      <TagsFilled />
                      {eventDetails.subEvents?.length}
                      {t("Different", { lng: currentLang })} date
                      <DownOutlined />
                      
                    </Space>
                  </a>
                  
                </Dropdown>

                <span>&nbsp;</span>
                </>
}
                {new Date(eventDetails.startDate).toLocaleDateString(
                        currentLang,
                        { weekday: "long" }
                      ) +
                        moment(eventDetails.startDate)
                          .utc()
                          .format(" DD MMM") 
                }
                <span>&nbsp;</span>{
                          new Date(eventDetails.endDate).toLocaleDateString(
                            currentLang,
                            { weekday: "long" }
                          ) +
                            moment(eventDetails.endDate)
                              .utc()
                              .format(" DD MMM")
                          }
              </div>
            </div>
            <div>
              {eventDetails.location &&
              <>
              <div className="event-time-header">{eventDetails.location?.name[currentLang]}</div>
              {eventDetails.location.postalAddress &&
              <address>
              {eventDetails.location.postalAddress.addressLocality}, 
              {eventDetails.location.postalAddress.addressRegion} <br /> {eventDetails.location.postalAddress.postalCode}<br/>
              {eventDetails.location.postalAddress.streetAddress}
              </address>
}
              </>
}
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

              {eventDetails.contactPoint && (
                <EventContact
                  name="contact"
                  values={eventDetails.contactPoint}
                  currentLang={currentLang}
                />
              )}
              {eventDetails.audience?.length > 0 && (
                <EventContact
                  name="audience"
                  values={eventDetails.audience}
                  currentLang={currentLang}
                />
              )}
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
            <div style={{marginRight:"40px"}}>
              <div className="event-detail-desc">
                {eventDetails.description[currentLang]}
              </div>
              {eventDetails.additionalType.map((item) => (
                <Button type="primary" className="types-button">
                  {item.name[currentLang]}
                </Button>
              ))}

              <div className="social-section">
                PARTAGER{" "}
                <span>
                  <TwitterOutlined className="social-icons" />{" "}
                  <GoogleOutlined className="social-icons" />
                  <FacebookFilled className="social-icons" />
                  <PrinterFilled
                    className="social-icons"
                    onClick={() => window.print()}
                  />
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
