import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import PropTypes from "prop-types";
import {
  Layout,
  Form,
  Input,
  Button,
  TimePicker,
  Select,
  DatePicker,
  Row,
  Col,
  Radio,
  message,
} from "antd";
import {
  FileImageOutlined,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Upload } from "antd";
import ServiceApi from "../services/Service";
import EventEditor from "../components/EventEditor";
import { useNavigate } from "react-router-dom";
import RecurringEvent from "../components/RecurringEvent";
import Compressor from "compressorjs";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlace } from "../action";
import { timeZone } from "../utils/Utility";

const { Option } = Select;
const { Dragger } = Upload;
// moment.tz.setDefault('Europe/Berlin')
const getSrcFromFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
};
const AddEvent = function ({ currentLang, eventDetails }) {
  const [formValue, setFormVaue] = useState();
  const [isEndDate, setIsEndDate] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [allLocations, setAllLocations] = useState();
  const [eventType, setEventType] = useState("offline");
  const [fileList, setFileList] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [isUpload, setIsUpload] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [compressedFile, setCompressedFile] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [startDisable, setStartDisable] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [endDisable, setEndDisable] = useState(moment().format("YYYY-MM-DD"));
  const { t, i18n } = useTranslation();

  

  const dispatch = useDispatch();
  const placeStore = useSelector((state) => state.place);
  useEffect(() => {
    if( placeStore==null)
    {
      getAllPlaces()
    }
    else
    {
     setAllLocations(placeStore);
     setPlaceList(placeStore.places);
    }
  }, []);
  const getAllPlaces = () => {
    ServiceApi.getAllPlaces()
      .then((response) => {
        if (response && response.data && response.data.data) {
          const events = response.data.data;
         
          
          setPlaceList(events.places)
          setAllLocations(events);
          dispatch(fetchPlace(events));
          //   setTotalPage(response.data.totalPage * 20)
        }
      })
      .catch((error) => {});
  };

  // useEffect(()=>{
  //   if( eventDetails && allLocations)
  //   {
  //   setEventType(eventDetails.eventAttendanceMode ==="OFFLINE"?"online":"offline");
  //   setPlaceList(eventDetails.eventAttendanceMode !=="OFFLINE"?allLocations.virtualLocation:allLocations.places);
  //   }
  // },[allLocations,eventDetails])
  const handleSubmit = (values) => {
   
    if(!isRecurring)
    {
    values.startDate.set({
      h: values.startTime.get("hour"),
      m: values.startTime.get("minute"),
    });
    if (isEndDate)
      values.endDate.set({
        h: values.endTime.get("hour"),
        m: values.endTime.get("minute"),
      });
    }
    const eventObj = {
      name: {
        fr: values.title,
      },
      description: {
        fr: values.desc,
      },
      startDate: !isRecurring ?moment(values.startDate).format("YYYY-MM-DDTHH:mm:ss"): undefined,
      scheduleTimezone: values.timeZone,
      locationId: {
        place: {
          entityId: eventType === "offline" ? values.location : null,
        },
        virtualLocation: {
          entityId: eventType === "online" ? values.location : null,
        },
      },
    };
    if (isEndDate && !isRecurring)
      eventObj.endDate = moment(values.endDate).format("YYYY-MM-DDTHH:mm:ss");
      if(isRecurring)
      {const recurEvent = {
        frequency: values.frequency,
        startDate: form.getFieldsValue().frequency !== "CUSTOM"&&moment(values.startDateRecur[0]).format("YYYY-MM-DD"),
        endDate: form.getFieldsValue().frequency !== "CUSTOM"&&moment(values.startDateRecur[1]).format("YYYY-MM-DD"),
        startTime: form.getFieldsValue().frequency !== "CUSTOM"&&moment(values.startTimeRecur).format("HH:mm"),
        endTime: form.getFieldsValue().frequency !== "CUSTOM"&&moment(values.endTimeRecur).format("HH:mm"),
        // timeZone: values.timeZone,
        weekDays:values.frequency==="WEEKLY"?values.daysOfWeek:undefined,
        customDates: form.getFieldsValue().frequency === "CUSTOM"&& form.getFieldsValue().customDates
      }; 
      eventObj.recurringEvent= recurEvent;
    } 

    if (eventDetails)
      ServiceApi.updateEvent(eventObj, eventDetails.uuid)
        .then((response) => {
          if (response && response.data) {
            if (isUpload && fileList.length > 0)
              ServiceApi.imageUpload(
                eventDetails.uuid,
                fileList[0].originFileObj,
                compressedFile
              )
                .then((response) => {
                  message.success("Event Updated Successfully");
                  navigate(`/admin/events`);
                })
                .catch((error) => {});
            else {
              message.success("Event Updated Successfully");
              navigate(`/admin/events`);
            }
          }
        })
        .catch((error) => {});
    else
      ServiceApi.addEvent(eventObj)
        .then((response) => {
          if (response && response.data) {
            if (isUpload && fileList.length > 0)
              ServiceApi.imageUpload(
                response.data.id,
                fileList[0].originFileObj,
                compressedFile
              )
                .then((response) => {
                  message.success("Event Created Successfully");
                  navigate(`/admin/events`);
                })
                .catch((error) => {});
            else {
              message.success("Event Created Successfully");
              navigate(`/admin/events`);
            }
          }
        })
        .catch((error) => {});
  };

  useEffect(() => {
    if (eventDetails) {
      if (eventDetails.endDate) setIsEndDate(true);
      if(placeStore!==null)
      setPlaceList(eventDetails?.eventAttendanceMode !=="OFFLINE"?placeStore.virtualLocation:placeStore.places);

      form.setFieldsValue({
        desc: eventDetails.description?eventDetails.description["fr"]:"",
        location: eventDetails.location?.uuid,
        startDate: moment(new Date(eventDetails.startDate), "DD-MM-YYYY").tz(eventDetails.scheduleTimezone?eventDetails.scheduleTimezone:"Canada/Eastern"),
        endDate: eventDetails.endDate ? moment(new Date(eventDetails.endDate), "DD-MM-YYYY").tz(eventDetails.scheduleTimezone?eventDetails.scheduleTimezone:"Canada/Eastern"):undefined,
        title: eventDetails.name["fr"],
        endTime: eventDetails.endDate ? moment(eventDetails.endDate.substring(11,20), "HH-mm-ss"): undefined,
        startTime: moment(eventDetails.startDate.substring(11,20), "HH-mm-ss"),
        timeZone: eventDetails.scheduleTimezone?eventDetails.scheduleTimezone:"Canada/Eastern",
      });
      if (eventDetails.image) {
        const obj = {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: eventDetails.image?.thumbnail?.uri,
        };
        setFileList([obj]);
      } else setFileList([]);
      if(eventDetails.recurringEvent)
      {
        setNumberOfDays(eventDetails.subEvents?.length)
        form.setFieldsValue({
          frequency: eventDetails.recurringEvent?.frequency,
          startDateRecur: [moment(new Date(eventDetails.recurringEvent?.startDate), "DD-MM-YYYY"),
           moment(new Date(eventDetails.recurringEvent?.endDate), "DD-MM-YYYY")],
          startTimeRecur: moment(eventDetails.recurringEvent?.startTime, "HH:mm"),
          endTimeRecur: moment(eventDetails.recurringEvent?.endTime, "HH:mm"),
          customDates:eventDetails.recurringEvent?.customDates,
          daysOfWeek:eventDetails.recurringEvent?.weekDays
        })
        setIsRecurring(true)
      }
    } else
      form.setFieldsValue({
        frequency: "DAILY",
        timeZone: "Canada/Eastern",
        desc: "",
      });
  }, [eventDetails]);
  // a.substring(11,20)
  const onChangeStart = (date, dateString) => {
    setStartDisable(moment(dateString, "MM-DD-YYYY"));
  };
  const onChangeEnd = (date, dateString) => {
    setEndDisable(moment(dateString, "MM-DD-YYYY"));
  };
  const handleChange = (e, option) => {
    if (e.target.value === "online") {
      setEventType("online");
      setPlaceList(allLocations.virtualLocations);
    } else {
      setEventType("offline");
      setPlaceList(allLocations.places);
    }
  };

  const onChange = (info) => {
    setIsUpload(true);
    setFileList(info.fileList);
    new Compressor(info.fileList[0].originFileObj, {
      // quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
      convertSize: 200000,
      success: (compressedResult) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.
        setCompressedFile(compressedResult);
        console.log();
      },
    });
  };
  const onPreview = async (file) => {
    const src = file.url || (await getSrcFromFile(file));
    const imgWindow = window.open(src);

    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    let customDate = moment().format("YYYY-MM-DD");
    return current && current < moment(customDate, "YYYY-MM-DD");
  };
  return (
    <Layout className="add-event-layout">
      <Form
        form={form}
        layout="vertical"
        className="update-status-form"
        data-testid="status-update-form"
        onFinish={handleSubmit}
        onFieldsChange={() => {
          setFormVaue(form.getFieldsValue());
        }}
      >
        <Row>
          <Col flex="0 1 450px">
            <div className="update-select-title">
              {t("Event", { lng: currentLang }) +
                " " +
                t("Name", { lng: currentLang })}
            </div>
            <Form.Item
              name="title"
              className="status-comment-item"
              rules={[
                {
                  required: true,
                  message: "Event name required",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Enter Event Name" className="replace-input" />
            </Form.Item>
            {!isRecurring &&
            <div className="flex-align">
              <div className="date-div">
                <div className="update-select-title">
                  {t("StartDate", { lng: currentLang })}
                </div>
                <Form.Item
                  name="startDate"
                  className="status-comment-item"
                  rules={[{ required: true, message: "Start date required" }]}
                >
                  <DatePicker
                    onChange={onChangeStart}
                    format="MM-DD-YYYY"
                    // disabledDate={disabledDate}
                    disabledDate={(d) => !d || d.isBefore(endDisable)}
                  />
                </Form.Item>
              </div>
              <div>
                <div className="update-select-title">
                  {t("StartTime", { lng: currentLang })}
                </div>
                <Form.Item
                  name="startTime"
                  className="status-comment-item"
                  rules={[{ required: true, message: "Start time required" }]}
                >
                  <TimePicker format="HH:mm:ss"/>
                </Form.Item>
              </div>
            </div>
}

{!isRecurring &&
            <div>
              <Button
                className="add-end-date-btn"
                icon={isEndDate ? <MinusOutlined /> : <PlusOutlined />}
                onClick={() => setIsEndDate(!isEndDate)}
              >
                {t("EndDateTime", { lng: currentLang })}
              </Button>
            </div>
}
            {isEndDate && !isRecurring && (
              <div className="flex-align">
                <div className="date-div">
                  <div className="update-select-title">
                    {t("EndDate", { lng: currentLang })}
                  </div>
                  <Form.Item
                    name="endDate"
                    className="status-comment-item"
                    rules={[{ required: true, message: "End date required" }]}
                  >
                    <DatePicker
                      format="MM-DD-YYYY"
                      onChange={onChangeEnd}
                      disabledDate={(d) => !d || d.isSameOrBefore(startDisable)}
                    />
                  </Form.Item>
                </div>
                <div>
                  <div className="update-select-title ">
                    {t("EndTime", { lng: currentLang })}
                  </div>
                  <Form.Item
                    name="endTime"
                    className="status-comment-item"
                    rules={[{ required: true, message: "End time required" }]}
                  >
                    <TimePicker format="HH:mm:ss"/>
                  </Form.Item>
                </div>
              </div>
            )}
            <div className="customize-div">
            <Button
              className="add-end-date-btn"
              icon={isRecurring ? <MinusOutlined /> : <PlusOutlined />}
              onClick={() => setIsRecurring(!isRecurring)}
            >
              {t("RecurringEvent", { lng: currentLang })}
            </Button>
            <Form.Item
            name="timeZone"
            className="timezone-item"
            rules={[{ required: true, message: "End time required" }]}
          >
          <Select defaultValue="Canada/Eastern" className="time-zone-select" bordered={false}>
              {timeZone.map(item=>
      <Option value={item.value} key={item.value}>{item.name}</Option>)}
      
    </Select>
    </Form.Item>
    </div>
            {isRecurring && <RecurringEvent currentLang={currentLang} formFields={formValue}
            numberOfDaysEvent={numberOfDays} form={form} eventDetails={eventDetails}/>}
            <div>
              <Radio.Group
                name="radiogroup"
                value={eventType}
                onChange={(e, i) => handleChange(e, i)}
              >
                <Radio value={"offline"}>{t("Offline", { lng: currentLang })}</Radio>
                <Radio value={"online"}>{t("Online", { lng: currentLang })}</Radio>
              </Radio.Group>
            </div>
            <div className="update-select-title">
              {t("Location", { lng: currentLang })}
            </div>

            <Form.Item name={"location"} rules={[{ required: true }]}>
              <Select
                data-testid="update-two-select-dropdown"
                placeholder={`Select Location`}
                key="updateDropdownKey"
                className="search-select"
                optionFilterProp="children"
                showSearch
                filterOption={(input, option) =>
                  option.children &&
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                }
                // onChange={handleChange}
                // defaultValue={selectList && selectList[0].name}
                // value={itemValue}
              >
                {placeList &&
                  placeList.map((item) => (
                    <Option
                      data-testid="update-two-select-option"
                      value={item.uuid}
                      key={item.name["fr"]}
                    >
                      {item.name["fr"]}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className="upload-col">
           
            <Dragger
              listType="picture-card"
              className={
                fileList.length > 0 ? "event-upload" : "ant-event-upload"
              }
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              aspect="3/3"
              accept="image/*"
            >
              <p className="ant-upload-drag-icon">
                <FileImageOutlined />
              </p>
              <p className="ant-upload-text">
                {t("FileUpload", { lng: currentLang })}
              </p>
              <p className="ant-upload-hint">
                {t("DragAndDrop", { lng: currentLang })}
              </p>
            </Dragger>
          </Col>
        </Row>
        <div className="update-select-title">{"Description"}</div>

        <EventEditor />

        <Form.Item className="submit-items">
          <Button
            size="large"
            icon={<CloseOutlined />}
            onClick={() => {
              form.resetFields();
              form.setFieldsValue({
                desc: "",
              });
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<CheckOutlined />}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};
export default AddEvent;

AddEvent.propTypes = {
  currentLang: PropTypes.string,
};
