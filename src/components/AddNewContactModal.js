import { Checkbox, Modal } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import AddContact from "../pages/AddContact/AddContact";
import AddPlaces from "../pages/AdminPlace/AddPlaces";
import AddOrganization from "../pages/AdminOrg/AddOrganization";

const AddNewContactModal = ({
  isModalVisible,
  setIsModalVisible,
  currentLang,
  type
}) => {
  const [checkOptions, setCheckOptions] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const handleOk = () => {
    

    setIsModalVisible(false);
  };

 

  const handleCancel = () => {
    setIsModalVisible(false);
  };
 

  
  return (
    <Modal
      title= {`Add ${type}`}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="copy-modal"
      okText="Done"
      footer={false}
    >
      {type==="Contact"?
      <AddContact currentLang={currentLang} contactDetails={null} isModal onsuccessAdd={handleOk}/>
      :
      type==="Contact"?
      <AddPlaces currentLang={currentLang} contactDetails={null} isModal onsuccessAdd={handleOk}/>
      :
      <AddOrganization currentLang={currentLang} contactDetails={null} isModal onsuccessAdd={handleOk}/>

  }

      
    </Modal>
  );
};
export default AddNewContactModal;
