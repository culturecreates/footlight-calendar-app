import {
  Button,
  Col,
  Divider,
  Modal,
  Row,
  TimePicker,
  Form,
  Checkbox,
  Empty,
} from "antd";
import React, { useEffect, useState } from "react";
import Calendar from "rc-year-calendar";
import uniqid from "uniqid";
import moment from "moment";
import {
  DeleteFilled,
  CopyOutlined,
  PlusOutlined,
  UndoOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import CopyTimeModal from "./CopyTimeModal";

const RecurringModal = ({ isModalVisible, setIsModalVisible, currentLang ,setCustomDates,customDates}) => {
  const [dateSource, setDataSource] = useState([]);
  const [test, setTest] = useState();
  const [showAddTime, setShowAddTime] = useState(false);
  const [updateAllTime, setUpdateAllTime] = useState(false)
  const [copyModal, setCopyModal] = useState(false)
  const [selectedDateId, setSelectedDateId] = useState("-100");
  const [selectedCopyTime, setSelectedCopyTime] = useState();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const obj ={
      startTime: moment(values.startTimeCustom).format("hh:mm a"),
      endTime:values.endTimeCustom && moment(values.endTimeCustom).format("hh:mm a"),
      start:moment(values.startTimeCustom).format("HH:mm"),
      end: values.endTimeCustom && moment(values.endTimeCustom).format("HH:mm")
    }
    
    if(updateAllTime){
      setDataSource(dateSource.map(item=>({...item,time:obj})))
    }
    else
    setDataSource(
      dateSource.map((item) => {
        if (selectedDateId === item.id) item.time = obj;
        return item;
      })
    );
    form.resetFields()
    setShowAddTime(false)
    setSelectedDateId("-100")
    
    setUpdateAllTime(false)
    
  };

  useEffect(() => {
    const d = new Date();
    let name = d.getMonth();
    const el1 = document.querySelector(`[data-month-id="${name}"]`);
    if (el1) el1.scrollIntoView();
    setDataSource(customDates)
  }, [isModalVisible]);

  const handleOk = () => {
    setCustomDates(dateSource)
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setDataSource([])
    setIsModalVisible(false);
  };

  const selectDate = (e) => {
    console.log(e);
    const eventObj = {
      id: uniqid(),
      name: "test name",
      location: "test Location",
      startDate: new Date(
        moment(e.startDate.toLocaleDateString()).format("YYYY,M,D")
      ),
      endDate: new Date(
        moment(e.endDate.toLocaleDateString()).format("YYYY,M,DD")
      ),
    };
    setDataSource([...dateSource, eventObj]);
  };

  useEffect(() => {
    if (test) {
      if (dateSource.find((item) => item.initDate === test.initDate))
        setDataSource(
          dateSource.filter((item) => item.initDate !== test.initDate)
        );
      else setDataSource([...dateSource, test]);
      setTest(null);
    }
    console.log(dateSource)
  }, [test]);

  const deleteEvent = (event) => {
    setDataSource(
      dateSource.map((item) => {
        if (event.id === item.id) item.isDeleted = true;
        return item;
      })
    );
  };
  const redoEvent = (event) => {
    setDataSource(
      dateSource.map((item) => {
        if (event.id === item.id) item.isDeleted = false;
        return item;
      })
    );
  };

  const copyEvents =(event)=>{
    setSelectedCopyTime(event)
    setCopyModal(true)

  }

  const onChangeCheckbox = (e) => {
    if(e.target.checked)
     setUpdateAllTime(true)
    else
     setUpdateAllTime(false) 
  };

  const deleteTime=(event)=>{
    setDataSource(
      dateSource.map((item) => {
        if (event.id === item.id) delete item.time;
        return item;
      })
    );
  }
  return (
    <Modal
      title="Custom Recurring Events"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="recurring-modal"
      okText="Done"
    >
      <Row>
        <Col>
          <Calendar
            className="recurring-cal"
            language="fr"
            minDate={new Date()}
            enableRangeSelection={true}
            //  onRangeSelected={e =>selectDate(e) }
            onRangeSelected={(e) => {
              const obj = {
                id: uniqid(),
                name: "test name",
                location: "test Location",
                startDate: e.startDate,
                endDate: e.endDate,
                initDate: e.startDate.toLocaleDateString(),
                isDeleted: false,
              };
              setTest(obj);
            }}
            dataSource={dateSource}
          />
        </Col>
        <Col flex="auto" className="custom-date-column">
          <div className="custom-time-layout">
            <div className="custom-no-of-date">{dateSource.length} dates</div>
            <div>{dateSource.filter(item=>item.time).length} times</div>
          </div>
          <Divider />
          <div>
            {dateSource.map((item) => (
              <div key={item.id}>
                <div className="custom-time-layout">
                  <div
                    className={
                      item.isDeleted
                        ? "deleted-text custom-no-of-date"
                        : "custom-no-of-date"
                    }
                  >
                    {moment(item.startDate.toLocaleDateString()).format(
                      "MMM,DD,YYYY"
                    )}
                  </div>
                  <div className="crud-icons">
                    {item.isDeleted ? (
                      <UndoOutlined onClick={() => redoEvent(item)} />
                    ) : (
                      <CopyOutlined onClick={()=> copyEvents(item)}/>
                    )}
                    <DeleteFilled onClick={() => deleteEvent(item)} />
                  </div>
                </div>
                {!item.isDeleted && item.time &&(
                  <div className="custom-time-layout" style={{ margin: "9px" }}>
                    <div>{item.time.startTime && item.time.startTime} - {item.time.endTime  && item.time.endTime} </div>
                    <div>
                      <CloseOutlined className="close-time" onClick={()=>deleteTime(item)}/>{" "}
                    </div>
                  </div>
                )}
                {!item.isDeleted && selectedDateId !== item.id && (
                  <div className="add-time-btn">
                    <span
                    style={{cursor:"pointer"}}
                      onClick={() => {
                        setShowAddTime(true);
                        setSelectedDateId(item.id);
                      }}
                    >
                      <PlusOutlined />
                      Add Time
                    </span>
                  </div>
                )}
                {!item.isDeleted && showAddTime && selectedDateId === item.id && (
                  <Form
                    form={form}
                    layout="vertical"
                    className="update-status-form"
                    data-testid="status-update-form"
                    onFinish={handleSubmit}
                  >
                    <div className="flex-align" style={{marginTop:"15px"}}>
                      <div className="date-div">
                        <div className="update-select-title">
                          {t("StartTime", { lng: currentLang })}
                        </div>
                        <Form.Item
                          name="startTimeCustom"
                          className="status-comment-item"
                          rules={[
                            { required: true, message: "Start time required" },
                          ]}
                        >
                          <TimePicker format="HH:mm" />
                        </Form.Item>
                      </div>
                      <div className="date-div">
                        <div className="update-select-title ">
                          {t("EndTime", { lng: currentLang })}
                        </div>
                        <Form.Item
                          name="endTimeCustom"
                          className="status-comment-item"
                          rules={[
                            { required: false, message: "End time required" },
                          ]}
                        >
                          <TimePicker format="HH:mm" />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="flex-align">
                      <Checkbox
                        onChange={onChangeCheckbox}
                        className="check-time"
                        checked={updateAllTime}
                      >
                        Add this time to all dates
                      </Checkbox>
                      <div>
                        <Form.Item className="add-time-items">
                          <Button
                            size="large"
                            onClick={() => {
                              form.resetFields();
                              setShowAddTime(false);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button type="primary" htmlType="submit" size="large">
                            Add
                          </Button>
                        </Form.Item>
                      </div>
                    </div>
                  </Form>
                )}
                <Divider />
              </div>
            ))}
            {dateSource.length===0 && 
            <Empty description={"No date selected"} />}
          </div>
        </Col>
      </Row>
      <CopyTimeModal
        isModalVisible={copyModal}
        setIsModalVisible={setCopyModal}
        currentLang={currentLang}
        recurringEvents={dateSource}
        copyTime={selectedCopyTime}
        updateTime={setDataSource}
      />
    </Modal>
  );
};

export default RecurringModal;
