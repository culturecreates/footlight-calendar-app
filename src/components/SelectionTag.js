import React from "react";
import { Tag } from "antd";
import PropTypes from "prop-types";
import "../App.css";

const SelectionTag = function ({ onClose, type, closeButton=false }) {
  return (
   
      <Tag closable={closeButton} className={closeButton?"tag-close":"tag-click"} color={closeButton?"#cd201f":"#fff"}>
        <div className="tag-content">
          {type &&
          <div className="tag-type">Type</div>
}
          <div className="tag-name">Name</div>
        </div>
      </Tag>
   
  );
};
export default SelectionTag;

SelectionTag.propTypes = {
  onClose: PropTypes.func,
  type: PropTypes.string
};
