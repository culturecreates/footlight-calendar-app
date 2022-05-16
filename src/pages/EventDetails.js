import React from "react";
import { Calendar } from "antd";
import PropTypes from "prop-types";
import "../App.css";
import { useParams } from "react-router-dom";

const EventDetails = function ({ onSelection, value }) {
    const { eventId } = useParams();
  return (
    <div className="site-calendar-demo-card">
     <div>hello{eventId}</div>
    </div>
  );
};
export default EventDetails;

EventDetails.propTypes = {
  onClose: PropTypes.func,
};
