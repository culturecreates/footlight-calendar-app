import React, { useState, useEffect, useRef } from "react";
import { Row, Col, ConfigProvider, Pagination, Button } from "antd";
import { useTranslation, Trans } from "react-i18next";

import PropTypes from "prop-types";
import "../App.css";
import { CloseOutlined } from "@ant-design/icons";
import EventCalendar from "../components/EventCalendar";
import SelectionTag from "../components/SelectionTag";
import moment from "moment";
import ServiceApi from "../services/Service";
import Spinner from "../components/Spinner";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/fr_CA";
import "moment/locale/fr-ca";
import EventItem from "../components/EventItem";
moment.locale("fr-ca");

const Events = function ({ onSelection }) {
  const scrollRef = useRef();
  const [locale, setLocale] = useState(zhCN);
  const [currentLang, setCurrentLang] = useState("fr");
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [regions, setRegions] = useState([]);
  const colors = [
    "#b2b4b6",
    "#fcb043",
    "#367443",
    "#eacc20",
    "#e2dd1f",
    "#b2b4b6",
    "#fcb043",
    "#367443",
    "#eacc20",
    "#e2dd1f",
  ];
  const [publicFilter, setPublic] = useState([]);
  const [types, setTypes] = useState([]);
  const [eventsFilter, setEventsFilter] = useState();
  const [calendarDate, setCalendarDate] = useState(moment());

  const { t, i18n } = useTranslation();

  useEffect(() => {
    moment.locale("fr-ca");
    getEvents();
    getCalendarInfo();
  }, []);

  const getCalendarInfo = () => {
    setLoading(true);
    ServiceApi.calendarInfo()
      .then((response) => {
        if (response && response.data && response.data) {
          const events = response.data;
          setupEventsFilter(events);
          setEventsFilter(events);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const setupEventsFilter = (events = eventsFilter) => {
    const regArr = events.regions.map((item, index) => {
      const obj = {
        name: item.name[currentLang],
        color: colors[index],
        selected: false,
      };
      return obj;
    });
    setRegions(regArr);

    const typeArr = events.eventAdditionalTypes.map((item, index) => {
      const obj = {
        name: item.name[currentLang],
        selected: false,
      };
      return obj;
    });
    setTypes(typeArr);

    const publicArr = events.audiences.map((item, index) => {
      const obj = {
        name: item.name[currentLang],
        selected: false,
      };
      return obj;
    });
    setPublic(publicArr);
  };
  const getEvents = (page = 1) => {
    setLoading(true);
    ServiceApi.eventList(page)
      .then((response) => {
        if (response && response.data && response.data.data) {
          const events = response.data.data;
          setEventList(events);
          //   setTotalPage(response.data.totalPage * 20)
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const selectTag = (item, type = "Public") => {
    item.selected = true;
    item.type = type;
    setFilter([...filter, item]);

    if (type === "Region") {
      const newArr = regions.map((object) => {
        if (object.name === item.name) {
          return { ...object, selected: true };
        }
        return object;
      });
      setRegions(newArr);
    } else if (type === "Public") {
      const newArr = publicFilter.map((object) => {
        if (object.name === item.name) {
          return { ...object, selected: true };
        }
        return object;
      });
      setPublic(newArr);
    } else {
      const newArr = types.map((object) => {
        if (object.name === item.name) {
          return { ...object, selected: true };
        }
        return object;
      });
      setTypes(newArr);
    }
    if (scrollRef)
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
  };
  const removeItem = (obj, type) => {
    const filterArray = filter.filter((item) => item.name !== obj.name);
    setFilter(filterArray);
    if (type === "Date") {
        setCalendarDate(moment())
    }
    else if (type === "Region") {
      const newArr = regions.map((object) => {
        if (object.name === obj.name) {
          return { ...object, selected: false };
        }
        return object;
      });
      setRegions(newArr);
    } else if (type === "Public") {
      const newArr = publicFilter.map((object) => {
        if (object.name === obj.name) {
          return { ...object, selected: false };
        }
        return object;
      });
      setPublic(newArr);
    } else {
      const newArr = types.map((object) => {
        if (object.name === obj.name) {
          return { ...object, selected: false };
        }
        return object;
      });
      setTypes(newArr);
    }
  };

  const dateSelection = (value) => {
    setCalendarDate(moment(value));
    const dateObj = {
      type: "Date",
      name: moment(value).format("DD MM YYYY"),
    };
    if (filter.find((o) => o.type === "Date")) {
      const newArr = filter.map((object) => {
        if (object.type === "Date") {
          return { ...object, name: moment(value).format("DD MM YYYY") };
        }
        return object;
      });

      setFilter(newArr);
    } else setFilter([...filter, dateObj]);
    if (scrollRef)
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
  };
  return (
    <div className="event-layout">
      <div className="side-filter">
        <div className="filter-type">{t("Region")}</div>
        <div>
          <Row gutter={16} className="region-row">
            {regions.map((item) => (
              <Col
                span={11}
                style={{ backgroundColor: item.color }}
                className="region-col-section"
                onClick={() => !item.selected && selectTag(item, "Region")}
              >
                <div className="region-col">{item.name}</div>
                {item.selected && (
                  <div
                    className="close-reg"
                    onClick={() => removeItem(item, "Region")}
                  >
                    <CloseOutlined className="close-reg-icon" />
                  </div>
                )}
              </Col>
            ))}
          </Row>
        </div>
        <ConfigProvider locale={locale}>
          <EventCalendar onSelection={dateSelection} value={calendarDate} />
        </ConfigProvider>
        <div className="filter-type">{t("Types")}</div>
        <div>
          {types.map((item) => (
            <SelectionTag
              item={item}
              group="Type"
              selectTag={selectTag}
              closeButton={item.selected}
              removeItem={removeItem}
            />
          ))}
        </div>
        <div className="filter-type">{t("Publics")}</div>
        <div>
          {publicFilter.map((item) => (
            <SelectionTag
              item={item}
              group="Public"
              selectTag={selectTag}
              closeButton={item.selected}
              removeItem={removeItem}
            />
          ))}
        </div>
      </div>
      <div className="right-events">
        <div ref={scrollRef}></div>
        <div className="selected-filter">
          {filter.map((item) => (
            <SelectionTag
              closeButton
              group={item.type}
              type={item.type}
              item={item}
              removeItem={removeItem}
            />
          ))}
        </div>
        {filter.length > 1 && (
          <Button
            className="remove-all"
            icon={<CloseOutlined />}
            danger
            onClick={() => {
              setFilter([]);
              setCalendarDate(moment());
              setupEventsFilter(eventsFilter);
            }}
          >
            Remove all search criteria
          </Button>
        )}
        <Row className="events-row">
          {eventList.map((item) => (
            <Col>
              <EventItem item={item} currentLang={currentLang} />
            </Col>
          ))}
        </Row>
        <Pagination
          className="event-pagination"
          defaultCurrent={1}
          pageSize={20}
          total={totalPage}
          hideOnSinglePage={true}
          showSizeChanger={false}
          onChange={(page) => getEvents(page)}
        />
      </div>
      {loading && <Spinner />}
    </div>
  );
};
export default Events;

Events.propTypes = {
  onClose: PropTypes.func,
};
