import { Card, DatePicker, Form, Select, TimePicker } from "antd";
import { useTranslation, Trans } from "react-i18next";
import moment from "moment";
import { useEffect, useState } from "react";
import { daysOfWeek, timeZone } from "../utils/Utility";
import "./RecurringEvent.css"
import RecurringModal from "./RecurringModal";
import {
    EditOutlined
  } from "@ant-design/icons";
const { Option } = Select;
const RecurringEvent = function ({ currentLang = "fr" ,formFields}) {
  const [startDisable, setStartDisable] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [endDisable, setEndDisable] = useState(moment().format("YYYY-MM-DD"));
  const [nummberofDates, setNumberofDates]=useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t, i18n } = useTranslation();

  const onChangeStart = (date, dateString) => {
    setStartDisable(moment(dateString, "MM-DD-YYYY"));
  };
  const onChangeEnd = (date, dateString) => {
    setEndDisable(moment(dateString, "MM-DD-YYYY"));
  };
  useEffect(()=>{
      console.log(formFields)
      if(formFields && formFields.endDateRecur && formFields.startDateRecur)
        getNumberOfDays(formFields.startDateRecur,formFields.endDateRecur)
  },[formFields])

  const getNumberOfDays=async(start,end)=>{
    let date = [];

    for (var m = moment(start); m.isSameOrBefore(end); m.add(1, 'days')) {
         date.push(m.format('DD/MM/YYYY'));
     }

     setNumberofDates(date.length)
   
  }
  return (
    <Card className="recurring-card">
      <div className="update-select-title">
        {t("Frequency", { lng: currentLang })}
      </div>
      <Form.Item
        name="frequency"
        className="status-comment-item"
        rules={[{ required: true, message: "Start date required" }]}
      >
        <Select
          style={{ width: 337 }}
          placeholder={`Select Frequency`}
          key="updateDropdownKey"
          className="search-select"
          optionFilterProp="children"
          defaultValue="DAILY"
      
        >
          <Option value="DAILY">Daily</Option>
          <Option value="WEEKLY">Weekly</Option>
          <Option value="CUSTOM">Custom</Option>
        </Select>
      </Form.Item>
      {formFields && formFields.frequency==="WEEKLY" &&
      <>
      <div className="update-select-title">
        {t("Days Of Week", { lng: currentLang })}
      </div>
      <Form.Item
        name="daysOfWeek"
        className="status-comment-item"
        rules={[{ required: true, message: "Start date required" }]}
      >
        <Select
          style={{ width: 337 }}
          placeholder={`Select Days`}
          key="updateDropdownKey"
          className="search-select"
          optionFilterProp="children"
          showSearch
          mode="multiple"
          filterOption={(input, option) =>
            option.children &&
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
            {daysOfWeek.map(item =>
          <Option value={item.value} key={item.value}>{item.name}</Option>)}
          
        </Select>
      </Form.Item>
      </>
}
      <div className="flex-align">
        <div className="date-div">
          <div className="update-select-title">
            {t("StartDate", { lng: currentLang })}
          </div>
          <Form.Item
            name="startDateRecur"
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
            name="startTimeRecur"
            className="status-comment-item"
            rules={[{ required: true, message: "Start time required" }]}
          >
<TimePicker format="HH:mm"/>
          </Form.Item>
        </div>
      </div>
      <div className="flex-align">
        <div className="date-div">
          <div className="update-select-title">
            {t("EndDate", { lng: currentLang })}
          </div>
          <Form.Item
            name="endDateRecur"
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
            name="endTimeRecur"
            className="status-comment-item"
            rules={[{ required: true, message: "End time required" }]}
          >
            <TimePicker format="HH:mm"/>
          </Form.Item>
        </div>
      </div>
      <div className="customize-div">
      {nummberofDates !==0 &&
          <div> {nummberofDates +" Dates"}</div>}
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
          {/* <div onClick={()=>setIsModalVisible(true)} className="customize"><EditOutlined />Customize</div> */}
      </div>
      <RecurringModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
    </Card>
  );
};
export default RecurringEvent;
