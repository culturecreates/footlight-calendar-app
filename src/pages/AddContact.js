import { Layout, Form, Input, Button, message } from "antd";
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import {
 
  CheckOutlined,
  CloseOutlined,
  
} from "@ant-design/icons";
import { adminContact } from "../utils/Utility";
import ServiceApi from "../services/Service";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchContact } from "../action";

const AddContact = function ({ currentLang,contactDetails,isModal=false,onsuccessAdd }) {
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const contactStore = useSelector((state) => state.contact);

  const handleSubmit = (values) => {
    const postalObj = {
        name: {fr:values.name},
        email:values.email,
        description: {fr:values.description},
        telephone:values.telephone,
        url: {uri:values.url},
    };
    setLoading(true)
    if (contactDetails)
    ServiceApi.updateContact(postalObj,contactDetails.uuid)
      .then((response) => {
        if (response && response.data) {
         
            
           
            setLoading(false)  
            message.success("Contact Updated Successfully");
            navigate(`/admin/contacts`);
         
        }
      })
      .catch((error) => {
        setLoading(false)
      });
      else
      ServiceApi.addContact(postalObj)
      .then((response) => {
        if (response && response.data) {
            setLoading(false) 
            if (contactStore != null) {
              const newContact = [...contactStore,postalObj]
              dispatch(fetchContact(newContact));
            }
            
            message.success("Contact Created Successfully");
            if(!isModal)
            navigate(`/admin/contacts`);
            else
            onsuccessAdd()
        }
      })
      .catch((error) => {
        setLoading(false)
      });
  };

  useEffect(() => {
    if (contactDetails) {
      setIsUpdate(true);
      form.setFieldsValue({
        name: contactDetails.name[currentLang],
        email:contactDetails.email,
        description: contactDetails.description && contactDetails.description[currentLang],
        telephone:contactDetails.telephone,
        url: contactDetails.url?.uri,
       
        
      });
      
    } 
  }, [contactDetails]);
  return (
    <Layout className="add-event-layout">
      <Form
        form={form}
        layout="vertical"
        className="update-status-form"
        data-testid="status-update-form"
        onFinish={handleSubmit}
      >
        {adminContact.map((item) => (
          <>
            <div className="update-select-title">{t(item.title,{ lng: currentLang })}</div>
            <Form.Item
              name={item.name}
              className="status-comment-item"
              rules={[
                {
                  required: item.required,
                  whitespace: true,
                },
              ]}
            >
              { item.type === "area"?
                <Input.TextArea
                  placeholder={item.placeHolder}
                  className="replace-input"
                  rows={4}
                />
                :
                <Input
                  placeholder={item.placeHolder}
                  className="replace-input"
                  
                />
              }
            </Form.Item>
          </>
        ))}

        <Form.Item className="submit-items">
          <Button
            size="large"
            icon={<CloseOutlined />}
            onClick={() => {
              if (isUpdate) navigate(`/admin/contacts`);
              else {
                form.resetFields();
                
              }
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
            {isUpdate ? "Update" : "Save"}
          </Button>
        </Form.Item>
      </Form>
      {loading && <Spinner />}
    </Layout>
  );
};
export default AddContact;