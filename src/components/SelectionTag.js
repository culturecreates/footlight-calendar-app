import React from "react";
import { Tag } from "antd";
import PropTypes from "prop-types";
import "../App.css";

const SelectionTag = function ({
  onClose,
  type,
  closeButton = false,
  item,
  selectTag,
  removeItem,
  group
}) {

  const selectionTag =(item)=>{
    if(!closeButton)
     selectTag(item,group)
  }
  const handleClose =(item)=>{
    if(closeButton)
     removeItem(item,group)
  }
  return (
    <Tag
      closable={closeButton}
      className={closeButton ? "tag-close" : "tag-click"}
      color={closeButton ? "#cd201f" : "#fff"}
      onClick={() => selectionTag(item)}
      onClose={() => handleClose(item)}
    >
      <div className="tag-content">
        {type && <div className="tag-type">{type}</div>}
        <div className="tag-name">{item.name}</div>
      </div>
    </Tag>
  );
};
export default SelectionTag;

SelectionTag.propTypes = {
  onClose: PropTypes.func,
  type: PropTypes.string,
};
