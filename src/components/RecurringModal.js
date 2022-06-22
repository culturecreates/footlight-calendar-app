import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import Calendar from 'rc-year-calendar';



const RecurringModal = ({isModalVisible,setIsModalVisible}) => {
  
    
 

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
   
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
      className="recurring-modal">
       <Calendar className="recurring-cal" language="fr" minDate={new Date()} enableRangeSelection={true}/>
      </Modal>

  );
};

export default RecurringModal;