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
  Col,
  Radio,
  message,
} from "antd";
import {
  FileImageOutlined,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  MinusOutlined
} from "@ant-design/icons";
import { useTranslation, Trans } from "react-i18next";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import ServiceApi from "../services/Service";
import EventEditor from "../components/EventEditor";
import { useNavigate } from "react-router-dom";


const { Option } = Select;
const { Dragger } = Upload;
const getSrcFromFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
};
const AddEvent = function ({ currentLang, eventDetails }) {
  const [isDisable, setdisable] = useState(true);
  const [isEndDate, setIsEndDate] = useState(false);
  const [allLocations, setAllLocations] = useState();
  const [eventType, setEventType] = useState("offline");
  const [fileList, setFileList] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [isUpload,setIsUpload] = useState(false)
  const [form] = Form.useForm();
  const navigate = useNavigate();


  const [startDisable, setStartDisable] = useState(moment().format("YYYY-MM-DD"));
  const [endDisable, setEndDisable] = useState(moment().format("YYYY-MM-DD"));
  const { t, i18n } = useTranslation();

  const propsImg = {
    width: 500, //裁剪宽度
    height: 300, //裁剪高度
    resize: true, //裁剪是否可以调整大小
    resizeAndDrag: true, //裁剪是否可以调整大小、可拖动
    modalTitle: "Event Image", //弹窗标题
    modalWidth: 600,
    grid: true, //弹窗宽度
  };

  useEffect(() => {
    getAllPlaces();
  }, []);
  const getAllPlaces = () => {
    ServiceApi.getAllPlaces()
      .then((response) => {
        if (response && response.data && response.data.data) {
          const events = response.data.data;
          setPlaceList(events.places);
          setAllLocations(events);

          //   setTotalPage(response.data.totalPage * 20)
        }
      })
      .catch((error) => {});
  };

  const handleSubmit = (values) => {
    values.startDate.set({
      h: values.startTime.get("hour"),
      m: values.startTime.get("minute"),
    });
    if (isEndDate)
    values.endDate.set({
      h: values.endTime.get("hour"),
      m: values.endTime.get("minute"),
    });

    const eventObj = {
      name: {
        fr: values.title,
      },
      description: {
        fr: values.desc,
      },
      startDate: moment(values.startDate).format("YYYY-MM-DDTHH:mm:ss"),

      locationId: {
        place: {
          entityId: eventType === "offline" ? values.location : null,
        },
        virtualLocation: {
          entityId: eventType === "online" ? values.location : null,
        },
      },
    };
    if (isEndDate)
      eventObj.endDate = moment(values.endDate).format("YYYY-MM-DDTHH:mm:ss");

    if (eventDetails)
      ServiceApi.updateEvent(eventObj, eventDetails.uuid)
        .then((response) => {
          if (response && response.data) {
            if(isUpload && fileList.length>0)
            ServiceApi.imageUpload(eventDetails.uuid, fileList[0].originFileObj)
              .then((response) => {
                message.success("Event Updated Successfully")
                navigate(`/admin/events`)
              })
              .catch((error) => {});
              else 
              {message.success("Event Updated Successfully")
              navigate(`/admin/events`)}
          }
          
          
        })
        .catch((error) => {});
    else
      ServiceApi.addEvent(eventObj)
        .then((response) => {
          if (response && response.data) {
            if(isUpload && fileList.length>0)
            ServiceApi.imageUpload(response.data.id, fileList[0].originFileObj)
              .then((response) => {
                message.success("Event Created Successfully")
                navigate(`/admin/events`)
              })
              .catch((error) => {});
             else 
             { message.success("Event Created Successfully")
             navigate(`/admin/events`)}
          }
        })
        .catch((error) => {});
  };

  useEffect(() => {
    if (eventDetails) {
      if (eventDetails.endDate) setIsEndDate(true);
      form.setFieldsValue({
        desc: eventDetails.description[currentLang],
        location: eventDetails.location.uuid,
        startDate: moment(new Date(eventDetails.startDate), "DD-MM-YYYY"),
        endDate: moment(new Date(eventDetails.endDate), "DD-MM-YYYY"),
        title: eventDetails.name[currentLang],
        endTime: moment(new Date(eventDetails.endDate), "HH-mm-ss"),
        startTime: moment(new Date(eventDetails.startDate), "HH-mm-ss"),
      });
      if (eventDetails.image) {
        const obj = {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: eventDetails.image.uri,
        };
        setFileList([obj]);
      } else setFileList([]);
    } else
      form.setFieldsValue({
        desc: "",
      });
  }, [eventDetails]);

  const onChangeStart = (date, dateString) => {
    setdisable(false);
    setStartDisable(moment(dateString, "MM-DD-YYYY"));
  };
  const onChangeEnd = (date, dateString) => {
    setdisable(false);

    setEndDisable(moment(dateString, "MM-DD-YYYY"));
  };
  const handleChange = (e, option) => {
    if (e.target.value === 2) {
      setEventType("offline");
      setPlaceList(allLocations.virtualLocations);
    } else {
      setEventType("online");
      setPlaceList(allLocations.places);
    }
  };

  const onChange = (info) => {
    setIsUpload(true)
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
                    disabledDate={(d) =>
                       !d || d.isBefore(endDisable) 
                    }
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
                  <TimePicker />
                </Form.Item>
              </div>
            </div>
           
              <Button
                className="add-end-date-btn"
                icon={isEndDate?<MinusOutlined />:<PlusOutlined />}
                onClick={() => setIsEndDate(!isEndDate)}
              >
                {t("EndDateTime", { lng: currentLang })}
              </Button>
          
            {isEndDate && (
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
                      disabledDate={(d) =>
                         !d || d.isSameOrBefore(startDisable)
                          
                      }
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
                    <TimePicker />
                  </Form.Item>
                </div>
              </div>
            )}
            <div>
              <Radio.Group
                name="radiogroup"
                defaultValue={1}
                onChange={(e, i) => handleChange(e, i)}
              >
                <Radio value={1}>{t("Offline", { lng: currentLang })}</Radio>
                <Radio value={2}>{t("Online", { lng: currentLang })}</Radio>
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
                      key={item.name[currentLang]}
                    >
                      {item.name[currentLang]}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col className="upload-col">
            {/* <ImgCrop {...propsImg}> */}
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
            {/* </ImgCrop> */}
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
