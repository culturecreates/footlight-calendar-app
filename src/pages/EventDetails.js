import React, { useEffect, useState } from "react";
import { Button, Menu, Dropdown, Space, Row, Col } from "antd";
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
  WifiOutlined,
  ForkOutlined
} from "@ant-design/icons";
import { useTranslation, Trans } from "react-i18next";
import ServiceApi from "../services/Service";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
import ICalendarLink from "react-icalendar-link";

const EventDetails = function ({ currentLang,isAdmin=false }) {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [eventDetails, setEventDetails] = useState();
  const [eventIcal, setEventIcal] = useState();
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
          if (response.data.StatusCode !== 400) {
            const eventTest = {
              title: events.name[currentLang],
              description: events.description[currentLang],
              location: events.location?.name[currentLang],
              startTime: events.startDate,
              endTime: events.endDate,

              // attendees: [
              //   "Hello World <hello@world.com>",
              //   "Hey <hey@test.com>",
              // ]
            };
            setEventIcal(eventTest);
            setEventDetails(events);
          }
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
            }) + moment(item.startDate).utc().format(" DD MMM YYYY")+" - "+ moment(item.startDate).utc().format("hh:mm A"),
          key: index,
        };
        return obj;
      })}
    />
  );
  const getDiffernceinDates = (start, end) => {
    const startDate = moment(start);
    const timeEnd = moment(end);
    const diff = timeEnd.diff(startDate);
    const diffDuration = moment.duration(diff);
    return diffDuration.hours() === 0 ? 24 : diffDuration.hours();
  };


  const getUriOffers=(data)=>{
  const obj = data.find(item=>item.url)
  return obj.url?.uri
  }
  return (
    <div>
    <div className="main-event-layout">
    <div style={{ justifyContent:"center" }}>
      <div className="left-button" onClick={() => navigate(isAdmin?'/admin/events':`/`)}
      style={{ maxWidth: "1100px" }}>
        <LeftOutlined className="left-icon" />
        {t("AllEvents", { lng: currentLang })}
      </div>
      {eventDetails && (
        <>
          <div className="event-title" style={{ maxWidth: "1100px" }}>{eventDetails.name[currentLang]}</div>
          <div className="event-title-section">
            <div className="event-time-section">
              <div className="event-time-header">
                {new Date(eventDetails.startDate).toLocaleDateString(
                  currentLang,
                  { weekday: "long" }
                ) + moment(eventDetails.startDate).utc().format(" DD MMM YYYY")}
              </div>
              <div>
                {moment(eventDetails.startDate).utc().format("hh:mm A")}
              </div>
              <div className="subevent-dropdown">
                {eventDetails?.subEvents?.length > 0 && (
                  <>
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <a
                        className="sub-events"
                        onClick={(e) => e.preventDefault()}
                      >
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
                )}
                {new Date(eventDetails.startDate).toLocaleDateString(
                  currentLang,
                  { weekday: "long" }
                ) + moment(eventDetails.startDate).utc().format(" DD MMM")}
                <span>&nbsp;{t("to", { lng: currentLang })} </span>
                {eventDetails.endDate &&
                  new Date(eventDetails.endDate).toLocaleDateString(
                    currentLang,
                    { weekday: "long" }
                  ) + moment(eventDetails.endDate).utc().format(" DD MMM")}
              </div>
            </div>
            <div>
              {eventDetails.location && (
                <>
                  <div className="event-time-header">
                    {eventDetails.location?.name[currentLang]}
                  </div>
                  {eventDetails.location.postalAddress && (
                    <address>
                      {eventDetails.location.postalAddress.addressLocality},
                      {eventDetails.location.postalAddress.addressRegion} <br />{" "}
                      {eventDetails.location.postalAddress.postalCode}
                      <br />
                      {eventDetails.location.postalAddress.streetAddress}
                    </address>
                  )}
                </>
              )}
              {eventDetails.attendanceMode === "ONLINE" &&<div className="virrtual-event"><WifiOutlined rotate={270}/><WifiOutlined rotate={90}
        style={{marginRight:"10px"}}/> {t("Online", { lng: currentLang })}</div>}
        {eventDetails.attendanceMode === "MIXED" &&<div className="virrtual-event"><ForkOutlined  rotate={180}
        style={{marginRight:"10px",fontSize:"17px"}}/> {t("Hybrid", { lng: currentLang })}</div>}
            </div>
          </div>
          <Row style={{ marginRight: "40px",marginLeft:"40px", maxWidth:"1100px" }}>
            <Col flex="0 1 320px">
              <div
                className="event-item"
                style={{
                  backgroundImage: eventDetails?.image
                    ? `url(${eventDetails?.image?.uri})`
                    : `url(https://cdn.caligram.com/uploads/event/8J5/medium/6242018236834.png)`,
                }}
              ></div>
              {eventDetails.offers && eventDetails.offers.length > 0 && (
                <>
                {eventDetails.facebookUrl &&
                  <Button type="primary" danger className="buy-button">
                    <a href={eventDetails.facebookUrl} target="_blank" rel="noreferrer">{t("Event", { lng: currentLang })} Facebook</a>
                  
                  </Button>
}
                  {eventDetails.offers.find(item=>item.url) &&
                  <Button danger className="buy-button">
                    <a href={getUriOffers(eventDetails.offers)} target="_blank" rel="noreferrer">{t("tickets", { lng: currentLang })}</a>
                    
                  </Button>
}
                </>
              )}
              {eventDetails.offers && (
                <EventContact
                  name="offers"
                  values={eventDetails.offers}
                  currentLang={currentLang}
                />
              )}
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
            </Col>
            <Col flex="1 1 400px" style={{ marginRight: "40px",marginLeft:"40px" }}>
              <div className="event-detail-desc">
                {eventDetails.description[currentLang]}
              </div>
              {eventDetails?.additionalType?.map((item) => (
                <Button type="primary" className="types-button">
                  {item.name[currentLang]}
                </Button>
              ))}

              <div className="social-section">
                {t("iCal", { lng: currentLang })}
                {""}
                <span>
                  {eventDetails &&
                <a href={`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${moment(eventDetails.startDate).utc().format("YYYYDDMMT0000Z")}/${moment(eventDetails.endDate).utc().format("YYYYDDMMT0000Z")}&location=${eventDetails.location?.name[currentLang]}&details=${eventDetails.description[currentLang]}`} target="_blank" rel="noreferrer">
                  <GoogleOutlined
                    className="social-icons"
                  />
                  </a>
}
                  <ICalendarLink event={eventIcal}>iCal</ICalendarLink>
                  <PrinterFilled
                    className="social-icons print-icon"
                    onClick={() => window.print()}
                  />
                </span>
                {t("socialLink", { lng: currentLang })}{" "}
                <span>
                  <a href={`https://twitter.com/home?status=${window.location.href}`} target="_blank" rel="noreferrer">
                  <TwitterOutlined  />
                  </a>{" "}
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}?imageurl=${eventDetails?.image?.uri}}`} target="_blank" rel="noreferrer">
                  <FacebookFilled  />
                  </a>                  
                </span>
              </div>
            </Col>
          </Row>
        </>
      )}
      {loading && <Spinner />}
    </div>
    </div>
    </div>
  );
};
export default EventDetails;
EventDetails.propTypes = {
  onClose: PropTypes.func,
};
