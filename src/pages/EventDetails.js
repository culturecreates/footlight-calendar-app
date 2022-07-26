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
import { useNavigate,useLocation,useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment-timezone";
import ICalendarLink from "react-icalendar-link";
import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "../action";

const EventDetails = function ({currentLang, isAdmin=false }) {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [updateLang, setUpdateLang] = useState(false);
  const [eventDetails, setEventDetails] = useState();
  const [eventIcal, setEventIcal] = useState();
  const [eventDate, setEventDate] = useState();
  
  const [search, setSearch] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const langStore = useSelector((state) => state.lang);


  const { eventId } = useParams();

  useEffect(() => {
    getEventDetails(eventId);
  }, []);

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get("lang");
    console.log(code,currentLang)
    if (code)
    {
      if(code==="en")
       moment.locale("en");
      dispatch(changeLang(code)); 
      setUpdateLang(true)
      
      const date = moment(params.get("date"), 'YYYY-MM-DD_HH-mm-ss')
      setEventDate(date)         
     
    }
    
  }, [location]);


  useEffect(() => {
    
    if( langStore && updateLang)
    {
      setSearch({ lang: langStore,
      date:moment(eventDetails.startDate).tz(eventDetails.scheduleTimezone?eventDetails.scheduleTimezone:"Canada/Eastern").format("YYYY-MM-DD_HH-mm-ss") });
     
    }
    
  }, [langStore]);

  const getEventDetails = (id) => {
    setLoading(true);
    ServiceApi.getEventDetail(id,false,true)
      .then((response) => {
        if (response && response.data && response.data) {
          const events = response.data;
          if (response.data.StatusCode !== 400) {
            const eventTest = {
              title: events.name[currentLang],
              description: events.description ? events.description[currentLang]:undefined,
              location: events.location?.name[currentLang],
              startTime: events.startDate?events.startDate :undefined,
              endTime: events.endDate?events.endDate:undefined,

              // attendees: [
              //   "Hello World <hello@world.com>",
              //   "Hey <hey@test.com>",
              // ]
            };
            setEventIcal(eventTest);
            setEventDetails(events);
            // setEventDate(eventDate) 
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
    onClick={(e)=>subEventsClick(eventDetails.subEvents[e.key])}
      items={eventDetails?.subEvents.map((item, index) => {
        if(index !==0)
        {
          const date =moment(item.startDate).tz(item.scheduleTimezone?item.scheduleTimezone:"Canada/Eastern").format("YYYY-MM-DD_HH-mm-ss")
          const dateFormated = moment(date, 'YYYY-MM-DD_HH-mm-ss')
        const obj = {
          label:
          moment(dateFormated).tz(eventDetails.scheduleTimezone?eventDetails.scheduleTimezone:"Canada/Eastern").format("dddd")
             + moment(dateFormated).tz(eventDetails.scheduleTimezone?eventDetails.scheduleTimezone:"Canada/Eastern").format(" DD MMM YYYY")+" - "+ moment(dateFormated).tz(eventDetails.scheduleTimezone?eventDetails.scheduleTimezone:"Canada/Eastern").format("hh:mm a"),
          key: index,
        };
        return obj;
      }
      })}
    />
  );
  // const getDiffernceinDates = (start, end) => {
  //   const startDate = moment(start);
  //   const timeEnd = moment(end);
  //   const diff = timeEnd.diff(startDate);
  //   const diffDuration = moment.duration(diff);
  //   return diffDuration.hours() === 0 ? 24 : diffDuration.hours();
  // };


  const getUriOffers=(data)=>{
  const obj = data.find(item=>item.url)
  return obj.url?.uri
  }
  const subEventsClick=(item)=>{
    const date =moment(item.startDate).tz(item.scheduleTimezone?item.scheduleTimezone:"Canada/Eastern").format("YYYY-MM-DD_HH-mm-ss")
          const dateFormated = moment(date, 'YYYY-MM-DD_HH-mm-ss')
    setEventDate(dateFormated) 
    if( langStore && updateLang)
    {
      setSearch({ lang: langStore,
      date:date});
     
    }
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
              {eventDate && <>
              <div className="event-time-header">
                {moment(eventDate).tz(eventDetails.scheduleTimezone?eventDetails.scheduleTimezone:"Canada/Eastern").format("dddd") + moment(eventDate).tz(eventDetails.scheduleTimezone?eventDetails.scheduleTimezone:"Canada/Eastern").format(" DD MMM YYYY")}
              </div>
              <div>
                {moment(eventDate).tz(eventDetails.scheduleTimezone?eventDetails.scheduleTimezone:"Canada/Eastern").format('hh:mm a')}
              </div>
              </>
}
              <div className="subevent-dropdown">
                {eventDetails?.subEvents?.length > 1 && (
                  <>
                    <Dropdown overlay={menu} trigger={["click"]} overlayClassName={eventDetails.subEvents?.length > 6 ?"date-popup":"test-date-event"}>
                      <a
                        className="sub-events"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Space>
                          <TagsFilled />
                          {eventDetails.subEvents?.length-1}
                          {t("Different", { lng: currentLang })} date
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>

                    <span>&nbsp;</span>
                  </>
                )}
                {
                  moment(moment(eventDetails.startDate).tz(eventDetails.scheduleTimezone?eventDetails.scheduleTimezone:"Canada/Eastern").format("YYYY-MM-DD"), "YYYY-MM-DD").format('dddd')
                + moment(eventDetails.startDate).tz(eventDetails.scheduleTimezone?eventDetails.scheduleTimezone:"Canada/Eastern").format(" DD MMM")}
                <span>&nbsp;{t("to", { lng: currentLang })} </span>
                {eventDetails.endDate &&
                moment(moment(eventDetails.endDate).tz(eventDetails.scheduleTimezone?eventDetails.scheduleTimezone:"Canada/Eastern").format("YYYY-MM-DD"), "YYYY-MM-DD").format('dddd')
                   + moment(eventDetails.endDate).tz(eventDetails.scheduleTimezone?eventDetails.scheduleTimezone:"Canada/Eastern").format(" DD MMM")}
                  {}
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
                  cursor:"unset",
                  backgroundImage: eventDetails?.image
                    ? `url(${eventDetails?.image?.thumbnail?.uri})`
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
             {eventDetails.sameAs && eventDetails.sameAs.length > 0 && (
                <EventContact
                  name="Link"
                  values={eventDetails.url?[eventDetails.sameAs,eventDetails.url.uri]:eventDetails.sameAs}
                  currentLang={currentLang}
                />
              )}
               {eventDetails.organizer &&eventDetails.organizer.organizations?.length>0 && (
                <EventContact
                  name="organizations"
                  values={eventDetails.organizer.organizations}
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
               {/* {eventDetails.type?.length > 0 && (
                <EventContact
                  name="type"
                  values={eventDetails.type}
                  currentLang={currentLang}
                />
              )} */}
             {eventDetails.additionalType?.length > 0 && (
                <EventContact
                  name="additionalType"
                  values={eventDetails.additionalType}
                  currentLang={currentLang}
                />
              )}
            </Col>
            <Col flex="1 1 400px" style={{ marginRight: "40px",marginLeft:"40px" }}>
              <div className="event-detail-desc" dangerouslySetInnerHTML={{__html: eventDetails.description&& eventDetails.description[currentLang]}}>
                {/* {eventDetails.description&& eventDetails.description[currentLang]} */}
              </div>
              {eventDetails?.additionalType?.map((item) => (
                <Button type="primary" className="types-button">
                  {item.name[currentLang]}
                </Button>
              ))}

              {/* <div className="social-section"> */}
              <Row justify="end"  className="social-section">
              <Col  >
                {t("iCal", { lng: currentLang })}
                {""}
                <span>
                  {eventDetails && eventDetails.startDate &&
                <a href={`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${moment(eventDetails.startDate).tz(eventDetails.scheduleTimezone?eventDetails.scheduleTimezone:"Canada/Eastern").format("YYYYDDMMT0000Z")}/${moment(eventDetails.endDate).tz(eventDetails.scheduleTimezone?eventDetails.scheduleTimezone:"Canada/Eastern").format("YYYYDDMMT0000Z")}&location=${eventDetails.location?.name[currentLang]}&details=${eventDetails.description[currentLang]}`} target="_blank" rel="noreferrer">
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
                </Col>
                <Col>
                {t("socialLink", { lng: currentLang })}{" "}
                <span>
                  <a href={`https://twitter.com/home?status=${window.location.href}`} target="_blank" rel="noreferrer">
                  <TwitterOutlined  />
                  </a>{" "}
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}?imageurl=${eventDetails?.image?.uri}}`} target="_blank" rel="noreferrer">
                  <FacebookFilled  />
                  </a>                  
                </span>
                </Col>
                </Row>
              {/* </div> */}
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
