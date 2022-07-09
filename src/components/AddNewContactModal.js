import { Checkbox, Modal } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import AddContact from "../pages/AddContact/AddContact";

const AddNewContactModal = ({
  isModalVisible,
  setIsModalVisible,
  currentLang,
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
      title="Add Contact"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="copy-modal"
      okText="Done"
      footer={false}
    >
      <AddContact currentLang={currentLang} contactDetails={null} isModal onsuccessAdd={handleOk}/>
      
    </Modal>
  );
};
export default AddNewContactModal;
