import React from "react";
import { Calendar } from "antd";
import PropTypes from "prop-types";
import "../App.css";

const EventCalendar = function ({ onSelection }) {
  function onPanelChange(value) {
    onSelection(value)
  }
  return (
    <div className="site-calendar-demo-card">
      <Calendar fullscreen={false} onSelect={onPanelChange}
       />
    </div>
  );
};
export default EventCalendar;

EventCalendar.propTypes = {
  onClose: PropTypes.func,
};
