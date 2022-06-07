import React, { useState, useEffect } from "react";
import moment from "moment";
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
  Col,Radio
} from "antd";
import { FileImageOutlined,CheckOutlined,CloseOutlined } from "@ant-design/icons";
import { useTranslation, Trans } from "react-i18next";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import { adminSideMenuLinks, convertDateFormat } from "../utils/Utility";
import ServiceApi from "../services/Service";
import EventEditor from "../components/EventEditor";

const { Header, Content, Sider } = Layout;
const { Option } = Select;
const { Dragger } = Upload;
const getSrcFromFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
};
const AddEvent = function ({ currentLang }) {
  const [isDisable, setdisable] = useState(true);
  const [allLocations, setAllLocations] = useState();
  const [eventType, setEventType] = useState("offline");
  const [fileList, setFileList] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [form] = Form.useForm();

  const [startDisable, setStartDisable] = useState();
  const [endDisable, setEndDisable] = useState();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getAllPlaces();
  }, []);
  const getAllPlaces = () => {
    ServiceApi.getAllPlaces()
      .then((response) => {
        if (response && response.data && response.data.data) {
          const events = response.data.data;
          setPlaceList(events.places);
          setAllLocations(events)

          //   setTotalPage(response.data.totalPage * 20)
        }
      })
      .catch((error) => {});
  };

  const handleSubmit = (values) => {
     values.startDate.set({h: values.startTime.get('hour'), m: values.startTime.get('minute')});
     values.endDate.set({h: values.endTime.get('hour'), m: values.endTime.get('minute')});
    
    const eventObj = {
      name: {
        fr: values.title,
      },
      description: {
        fr: values.desc,
      },
      startDate: moment(values.startDate)
        .format("YYYY-MM-DDTHH:mm:ss"),
        endDate: moment(values.endDate)
        .format("YYYY-MM-DDTHH:mm:ss"),
      locationId: {
        place: {
          entityId: eventType==="offline"? values.location:null,
        },
        virtualLocation: {
          entityId: eventType==="online"? values.location:null,
        },
      },
    };

    // ServiceApi.imageUpload("629ed8484ffd7b0066173377", fileList[0].originFileObj)
    //     .then((response) => {
    //       if (response && response.data && response.data.data) {
           
    
    //         //   setTotalPage(response.data.totalPage * 20)
    //       }
    //     })

    ServiceApi.addEvent(eventObj)
    .then((response) => {
      if (response && response.data) {
       
        ServiceApi.imageUpload(response.data.id, fileList[0].originFileObj)
        .then((response) => {
          if (response && response.data && response.data.data) {
           
          }
        })
        .catch((error) => {});
      }
    })
    .catch((error) => {});
    
  };

  useEffect(() => {
    form.setFieldsValue({
      desc: "",
      techSegmentName: "",
    });
  }, []);

  const onChangeStart = (date, dateString) => {
    setdisable(false);
    setStartDisable(
      moment(dateString, "MM-DD-YYYY")
    );
  };
  const onChangeEnd = (date, dateString) => {
    setdisable(false);

    setEndDisable(
      moment(dateString, "MM-DD-YYYY")
    );
  };
  const handleChange = (e, option) => {
    if(e.target.value === 2)
    {
      setEventType("offline")
      setPlaceList(allLocations.virtualLocations)
    }
    else
    {
      setEventType("online")
      setPlaceList(allLocations.places)}
  };

  const onChange = (info) => {
    console.log(info.fileList)
    setFileList(info.fileList);
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
  return (
    <Layout className="add-event-layout">
      <Form
        form={form}
        layout="vertical"
        className="update-status-form"
        data-testid="status-update-form"
        onFinish={handleSubmit}
      >
        <Row>
          <Col flex="0 1 400px">
            <div className="update-select-title">{t("Event", { lng: currentLang })+" "+t("Name", { lng: currentLang })}</div>
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
            <div className="flex-align">
              <div className="date-div">
                <div className="update-select-title">{t("StartDate", { lng: currentLang })}</div>
                <Form.Item
                  name="startDate"
                  className="status-comment-item"
                  rules={[
                    { required: true, message: "Start date required" },
                  ]}
                >
                  <DatePicker onChange={onChangeStart} format="MM-DD-YYYY"
            disabledDate={d =>!isDisable ? !d || d.isAfter(endDisable) :undefined } />
                </Form.Item>
              </div>
              <div>
                <div className="update-select-title">Start Time</div>
                <Form.Item
                  name="startTime"
                  className="status-comment-item"
                  rules={[
                    { required: true, message: "Start time required" },
                  ]}
                >
                  <TimePicker />
                </Form.Item>
              </div>
            </div>
            <div className="flex-align">
              <div className="date-div">
                <div className="update-select-title">End Date</div>
                <Form.Item
                  name="endDate"
                  className="status-comment-item"
                  rules={[
                    { required: true, message: "End date required" },
                  ]}
                >
                  <DatePicker format="MM-DD-YYYY" onChange={onChangeEnd} 
            disabledDate={d =>!isDisable ? !d || d.isSameOrBefore(startDisable) : undefined}/>
                </Form.Item>
              </div>
              <div>
                <div className="update-select-title ">End Time</div>
                <Form.Item
                  name="endTime"
                  className="status-comment-item"
                  rules={[
                    { required: true, message: "End time required" },
                  ]}
                >
                  <TimePicker />
                </Form.Item>
              </div>
            </div>
            <Radio.Group name="radiogroup" defaultValue={1} onChange={(e,i) => handleChange(e,i)}>
    <Radio value={1}>Offline</Radio>
    <Radio value={2}>Virtual</Radio>
    
  </Radio.Group>
            <div className="update-select-title">{t("Location", { lng: currentLang })}</div>

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
                      key={item.name[currentLang]}
                    >
                      {item.name[currentLang]}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className="upload-col">
            <ImgCrop grid modalTitle="Event File">
              <Dragger
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                className={
                  fileList.length > 0 ? "event-upload" : "ant-event-upload"
                }
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                aspect="3/3"
              >
                <p className="ant-upload-drag-icon">
                  <FileImageOutlined />
                </p>
                <p className="ant-upload-text">Select Files to upload</p>
                <p className="ant-upload-hint">
                  or Drag and Drop files to upload
                </p>
              </Dragger>
            </ImgCrop>
          </Col>
        </Row>
        <div className="update-select-title">{"Descreption"}</div>

        <EventEditor />

        <Form.Item className="submit-items">
        <Button size="large" icon={<CloseOutlined />} onClick={()=>form.resetFields()}>Cancel</Button>
          <Button type="primary" htmlType="submit" size="large" icon={<CheckOutlined />}>
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
