import { Card, DatePicker, Form, Select, TimePicker } from "antd";
import { useTranslation, Trans } from "react-i18next";
import moment from "moment";
import { useEffect, useState } from "react";

const { Option } = Select;
const RecurringEvent = function ({ currentLang = "fr" ,formFields}) {
  const [startDisable, setStartDisable] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [endDisable, setEndDisable] = useState(moment().format("YYYY-MM-DD"));
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

     console.log(date.length,date)
   
  }
  return (
    <Card>
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
          defaultValue="daily"
          showSearch
          filterOption={(input, option) =>
            option.children &&
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="daily">Daily</Option>
          <Option value="weekly">Weekly</Option>
          <Option value="custom">Custom</Option>
        </Select>
      </Form.Item>
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
            <TimePicker />
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
            <TimePicker />
          </Form.Item>
        </div>
      </div>
    </Card>
  );
};
export default RecurringEvent;
