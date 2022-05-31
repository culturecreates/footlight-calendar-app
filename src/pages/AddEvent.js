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
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { adminSideMenuLinks, convertDateFormat } from "../utils/Utility";

var Size = Quill.import("attributors/style/size");
Size.whitelist = ["12px", "16px", "18px"];
const { Header, Content, Sider } = Layout;
const { Option } = Select;

const AddEvent = function ({ currentLang }) {
  const [isDisable, setdisable] = useState(true);
  const [selectList, setSelectList] = useState([]);
  const [htmlFile, setHtmlFile] = useState("");
  const [form] = Form.useForm();

  const [startDisable, setStartDisable] = useState(
    form.getFieldsValue().StartDate
  );
  const [endDisable, setEndDisable] = useState(form.getFieldsValue().StartDate);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: ["14px", "16px", "18px"] }],
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

  const handleSubmit = () => {};

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
  return (
    <Layout className="add-event-layout">
      <Form
        form={form}
        layout="vertical"
        className="update-status-form"
        data-testid="status-update-form"
        onFinish={() => handleSubmit()}
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

        <Form.Item name={"segmentList"} rules={[{ required: true }]}>
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
            {selectList &&
              selectList.map((item) => (
                <Option
                  data-testid="update-two-select-option"
                  value={item.id}
                  key={item.id}
                >
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        </Col>
        <Col flex="0 1 320px"></Col>
        </Row>
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
        <Form.Item shouldUpdate>
          <Button type="primary" htmlType="submit" size="large">
            Submit
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
