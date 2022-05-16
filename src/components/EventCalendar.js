import React from "react";
import { Calendar } from "antd";
import PropTypes from "prop-types";
import "../App.css";

const EventCalendar = function ({ onSelection, value }) {
  function onPanelChange(value) {
    onSelection(value)
  }
  return (
    <div className="site-calendar-demo-card">
      <Calendar fullscreen={false} onSelect={onPanelChange}
      value={value}
       />
    </div>
  );
};
export default EventCalendar;

EventCalendar.propTypes = {
  onClose: PropTypes.func,
};
