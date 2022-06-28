import { Checkbox, Modal } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";

const CopyTimeModal = ({
  isModalVisible,
  setIsModalVisible,
  currentLang,
  recurringEvents,
  copyTime,
  updateTime,
}) => {
  const [checkOptions, setCheckOptions] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const handleOk = () => {
    const newCopyArray = recurringEvents.filter((item) => {
      if (selectedCheckbox.includes(item.id)) item.time = copyTime.time;
      return item;
    });
    updateTime(newCopyArray);

    setIsModalVisible(false);
  };

  const onChange = (checkedValues) => {
    setSelectedCheckbox(checkedValues);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    if (copyTime)
      setCheckOptions(
        recurringEvents
          .filter((item) => item.id !== copyTime.id)
          .map((item) => {
            const obj = {
              label: moment(item.startDate.toLocaleDateString()).format(
                "MMM,DD,YYYY"
              ),
              value: item.id,
            };
            return obj;
          })
      );
  }, [recurringEvents, copyTime]);

  const onCheckAllChange = (e) => {
    setSelectedCheckbox(e.target.checked ? recurringEvents.map(item=>item.id) : []);
    
    setCheckAll(e.target.checked);
  };
  return (
    <Modal
      title="Duplicate Times"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="copy-modal"
      okText="Done"
    >
      {copyTime && copyTime.time && (
        <div className="replace-txt">
          {copyTime.time.startTime && copyTime.time.startTime} -{" "}
          {copyTime.time.endTime && copyTime.time.endTime}{" "}
        </div>
      )}
      <div className="replace-txt">
        Replace existing times on the following dates:
      </div>
      <Checkbox.Group
        className="copycheck"
        options={checkOptions}
        onChange={onChange}
        value={selectedCheckbox}
      />
      <Checkbox  onChange={onCheckAllChange} checked={checkAll} className="select-all-check">
      {checkAll?"Unselect All": "Select All"}
      </Checkbox>
    </Modal>
  );
};
export default CopyTimeModal;
