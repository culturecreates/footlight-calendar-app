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
} from "antd";
import { FileImageOutlined } from '@ant-design/icons';


import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { adminSideMenuLinks, convertDateFormat } from "../utils/Utility";
import ServiceApi from "../services/Service";

var Size = Quill.import("attributors/style/size");
Size.whitelist = ["12px", "16px", "18px"];
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
  const [selectList, setSelectList] = useState([]);
  const [htmlFile, setHtmlFile] = useState("");
  const [fileList, setFileList] = useState([
  ]);
  const [placeList, setPlaceList] = useState([]);
  const [form] = Form.useForm();

  const [startDisable, setStartDisable] = useState(
    form.getFieldsValue().StartDate
  );
  const [endDisable, setEndDisable] = useState(form.getFieldsValue().StartDate);

  useEffect(()=>{
  getAllPlaces();
  },[])
  const getAllPlaces=()=>{
    ServiceApi.getAllPlaces()
    .then((response) => {
      if (response && response.data && response.data.data) {
        const events = response.data.data;
        setPlaceList(events);

        //   setTotalPage(response.data.totalPage * 20)
      }
    })
    .catch((error) => {
    });
  }
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      // [{ size: ["14px", "px", "18px"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
          ],
        },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const handleSubmit = (values) => {
    // values.startTime.set({h: 11, m: 11});
    const eventObj={
      name:{
        fr:values.title,
      },
      description:{
        fr:values.desc,
      },
      StartDate:moment(values.startDate).utc().format("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
      locationId: {
        place: {
          entityId: values.location
        },
        virtualLocation: {
          entityId: "string"
        }
      },
    
    }
    console.log(values,eventObj)
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
      moment(new Date(convertDateFormat(dateString)), "MM-DD-YYYY")
    );
  };
  const onChangeEnd = (date, dateString) => {
    setdisable(false);

    setEndDisable(
      moment(new Date(convertDateFormat(dateString)), "MM-DD-YYYY")
    );
  };
  const handleChange = (value, option) => {};
  const handleChangeDesc = (html) => {
    setHtmlFile(html);
  };
  
  const onChange = (info) => {
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
        onFinish={ handleSubmit}
      >
        <Row >
      
    
   
        
      <Col flex="0 1 400px">
        <div className="update-select-title">
          Event Name
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
              Start Date
            </div>
            <Form.Item
              name="startDate"
              className="status-comment-item"
              rules={[{ required: true, message: "Dev Pct Complete required" }]}
            >
              <DatePicker format="MM-DD-YYYY" />
            </Form.Item>
          </div>
          <div>
            <div className="update-select-title">
              Start Time
            </div>
            <Form.Item
              name="startTime"
              className="status-comment-item"
              rules={[{ required: true, message: "Dev Pct Complete required" }]}
            >
              <TimePicker />
            </Form.Item>
          </div>
        </div>
        <div className="flex-align">
          <div className="date-div">
            <div className="update-select-title">
              End Date
            </div>
            <Form.Item
              name="endDate"
              className="status-comment-item"
              rules={[{ required: true, message: "Dev Pct Complete required" }]}
            >
              <DatePicker format="MM-DD-YYYY" />
            </Form.Item>
          </div>
          <div>
            <div className="update-select-title ">
              End Time
            </div>
            <Form.Item
              name="endTime"
              className="status-comment-item"
              rules={[{ required: true, message: "Dev Pct Complete required" }]}
            >
              <TimePicker />
            </Form.Item>
          </div>
        </div>
        
        <div className="update-select-title">{"Location"}</div>

        <Form.Item name={"location"} >
          <Select
            data-testid="update-two-select-dropdown"
            placeholder={`Select Location`}
            key="updateDropdownKey"
            className="search-select"
            optionFilterProp="children"
            showSearch
            filterOption={(input, option) =>
              option.children &&
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={handleChange}
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
        className={fileList.length>0?"event-upload":"ant-event-upload"}
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
        <Form.Item name={"desc"} rules={[{ required: true }]}>
          <ReactQuill
            theme={"snow"}
            value={htmlFile || ""}
            bounds={".app"}
            placeholder="Add event descreption"
            modules={modules}
            formats={formats}
            onChange={handleChangeDesc}
          />
        </Form.Item>
        <Form.Item>
          
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
          <Button   size="large">
            Clear
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
