import React, { useState, useEffect, useRef } from "react";
import { Row, Col, ConfigProvider, Pagination, Button, Empty, DatePicker } from "antd";
import { useTranslation, Trans } from "react-i18next";
import "../Event.css";
import PropTypes from "prop-types";
import { CloseOutlined,AppstoreOutlined } from "@ant-design/icons";
import EventCalendar from "../../components/EventCalendar";
import SelectionTag from "../../components/SelectionTag";
import moment from "moment";
import ServiceApi from "../../services/Service";
import Spinner from "../../components/Spinner";
import EventItem from "../../components/EventItem";
import SemanticSearch from "../../components/SemanticSearch";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilter } from "../../action";


const Events = function ({ currentLang,locale }) {
  const scrollRef = useRef();
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [regions, setRegions] = useState([]);
  const [searchUpdate, setSearchUpdate] = useState();
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
  const dispatch = useDispatch();
  const filterStore = useSelector((state) => state.filter);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    moment.locale("fr-ca");
    if(filterStore && filterStore.data)
    {
      setupEventsFilter(filterStore.data);
      setEventsFilter(filterStore.data);
    }
    else
    getCalendarInfo();

  }, []);
  
  useEffect(() => {
    getEvents();
  }, [filter]);
  useEffect(() => {
    if(eventsFilter)
     setupEventsFilter(eventsFilter)

     setFilter([])
  }, [currentLang]);
 
  const getCalendarInfo = () => {
    setLoading(true);
    ServiceApi.calendarInfo()
      .then((response) => {
        if (response && response.data && response.data) {
          const events = response.data;
          setupEventsFilter(events);
          setEventsFilter(events);
          const eventData={
            data:events,
            selectedValue: null,
          }
          dispatch(fetchFilter(eventData));
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
  const getEvents = (page = 1, filterArray=filter) => {
    setLoading(true);
    ServiceApi.eventList(page,filterArray,currentLang==="en"?"EN":"FR")
      .then((response) => {
        if (response && response.data && response.data.data) {
          const events = response.data.data;
          setEventList(events);
         if(response.data.totalCount)
             setTotalPage(response.data.totalCount)
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const selectTag = (item, type = "Public") => {
    setSearchUpdate(item)
    item.selected = true;
    item.type = type;
    setFilter([...filter.filter(item=>item.from !== "search"), item]);

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
    console.log("remove")
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

  const selectSemantic=(selectObj)=>{
      setupEventsFilter(eventsFilter)
      const searchArray=[selectObj]
      setFilter(searchArray)
  }

  const onClearSearch=()=>{
    setFilter([])
  }
  return (
      <>
      <SemanticSearch onSelection={selectSemantic} onClearSearch={onClearSearch}
      currentLang={currentLang} searchUpdate={searchUpdate}/>
      <div className="main-event-layout">
      {eventsFilter &&
      <Row className="event-layout">
      
    
   
        
      <Col flex="0 1 320px">
        <div className="filter-type">{t("Region", { lng: currentLang })}</div>
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

        <div className="filter-type calendar-top">{t("Types", { lng: currentLang })}</div>
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
        <div className="filter-type">{t("Publics", { lng: currentLang })}</div>
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
      </Col>
      <Col flex="1 1 400px">
        <div ref={scrollRef}></div>
        <div className="filter-type"><AppstoreOutlined className="search-results"/>{t("Results", { lng: currentLang })}</div>
        <div className="selected-filter">
          {filter.filter(item=>item.from !== "search" && item.type !== "queryString").map((item) => (
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
              console.log("close")
              setFilter([]);
              setCalendarDate(moment());
              setupEventsFilter(eventsFilter);
            }}
          >
            {t("Remove", { lng: currentLang })}
          </Button>
        )}
        <Row className="events-row">
          {eventList.map((item) => (
            <Col key={item.uuid} 
           
            >
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
        {!loading && eventList.length === 0  &&
      <div>
      <Empty description={"No Events"} />
      </div>}
      </Col>
     
      
      </Row>
}
{loading && <Spinner />}
    </div>
    </>
  );
};
export default Events;

Events.propTypes = {
  onClose: PropTypes.func,
};
