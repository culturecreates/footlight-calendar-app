import React from "react";
import { Tag } from "antd";
import PropTypes from "prop-types";
import "../App.css";

const SelectionTag = function ({ onClose }) {
  return (
   
      <Tag closable className="tag-close" color="#cd201f">
        <div className="tag-content">
          <div className="tag-type">Type</div>
          <div className="tag-name">Name</div>
        </div>
      </Tag>
   
  );
};
export default SelectionTag;

SelectionTag.propTypes = {
  onClose: PropTypes.func,
};
