import React from "react";
import { Calendar } from "antd";
import PropTypes from "prop-types";
import "../App.css";

const EventCalendar = function ({ onClose }) {
  function onPanelChange(value, mode) {
    console.log(value, mode);
  }
  return (
    <div className="site-calendar-demo-card">
      <Calendar fullscreen={false} onPanelChange={onPanelChange}
       />
    </div>
  );
};
export default EventCalendar;

EventCalendar.propTypes = {
  onClose: PropTypes.func,
};
