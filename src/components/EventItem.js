import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import "../App.css";
import { useNavigate } from "react-router-dom";
import {
  WifiOutlined ,ForkOutlined
} from "@ant-design/icons";

const EventItem = function ({ item, currentLang }) {
    const navigate = useNavigate();
    const redirectionToDetails=()=>{
        
        navigate(`/events/${item.uuid}`);
    }
  return (
    <div
      className="event-item"
      style={{
        backgroundImage: item.image
          ? `url(${item?.image?.thumbnail?.uri})`
          : `url(https://cdn.caligram.com/uploads/event/8J5/medium/6242018236834.png)`,
      }}
      onClick={()=>redirectionToDetails()}
    >
      <div>
        <div className="event-date">
          <div className="event-date-section">
            <div>{moment(item.startDate).utc().format("DDMMM")}</div>
            {item.endDate &&
            <>
            <div>&nbsp;-&nbsp;</div>
            <div>{moment(item.endDate).utc().format("DDMMM")}</div>
            </>}
          </div>
        </div>
      </div>
      <div className="event-detail">
        <div className="event-desc">{item.name[currentLang]}</div>
        <div className="event-name">{item.attendanceMode === "ONLINE" &&<><WifiOutlined rotate={270}/><WifiOutlined rotate={90}
        style={{marginRight:"15px"}}/></>}
        {item.attendanceMode === "MIXED" &&<><ForkOutlined  rotate={180}
        style={{marginRight:"15px",fontSize:"17px"}}/></>}
        {item.locationName[currentLang]}</div>
      </div>
    </div>
  );
};
export default EventItem;

EventItem.propTypes = {
  currentLang: PropTypes.string,
};
