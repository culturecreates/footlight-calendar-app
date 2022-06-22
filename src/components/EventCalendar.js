import React from "react";
import { DatePicker } from "antd";
import PropTypes from "prop-types";
import "../App.css";

const EventCalendar = function ({ onSelection, value }) {
  function onPanelChange(value) {
    onSelection(value);
  }
  return (
    <div className="site-calendar-demo-card">
      {/* <Calendar fullscreen={false} onSelect={onPanelChange}
      value={value}
      mode='month'       /> */}
      <DatePicker
        open
        // getPopupContainer={() => document.getElementById("date-popup")}
        dropdownClassName="calendar-dropdown"
        //  showNow={false}
        popupStyle={{
          position: "absolute",
          // top:530
        }}
        onSelect={onPanelChange}
        value={value}
      />
      <div id="date-popup" />
    </div>
  );
};
export default EventCalendar;

EventCalendar.propTypes = {
  onClose: PropTypes.func,
};
