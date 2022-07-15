import { Radio, Modal,Form,Input,Button ,Select} from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DollarCircleOutlined,PlusOutlined,DeleteOutlined } from '@ant-design/icons';
import { timeZone, urlValidate } from "../../utils/Utility";
import uniqid from "uniqid";
import "./PriceModal.css"
const { Option } = Select;


const PriceModal = ({
  isModalVisible,
  setIsModalVisible,
  currentLang,
}) => {
  const [payantList, setPayantList] = useState([{
      desc:"",
      dollar:"",
      id: uniqid(),
  }]);
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const [priceType, setPriceType] = useState("Gratuit");
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();

  const handleOk = () => {

    setIsModalVisible(false);
    
  };

 
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
 
  }, []);

 const addPayant =()=>{
     setPayantList([...payantList,{
        desc:"",
        dollar:"",
        id: uniqid(),
    }])
 }
  const handleChange = (e, option) => {
    setPriceType(e.target.value)
   
  };
  const deletePrice=(itemPrice)=>{
      setPayantList(payantList.filter(item=>item.id !== itemPrice.id))
  }
  const handleSubmit = (values) => {
  }
 
  return (
    <Modal
      title="Price/Prix"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="price-modal"
      footer={null}
    >
       <div style={{marginBottom:"10px"}}>
              <Radio.Group
                name="radiogroup"
                className="price-radio"
                value={priceType}
                onChange={(e, i) => handleChange(e, i)}
              >
                <Radio value={"Gratuit"}>
                  {t("Gratuit", { lng: currentLang })}
                </Radio>
                <Radio value={"Payant"}>
                  {t("Payant", { lng: currentLang })}
                </Radio>
                <Radio value={"Contribution"}>
                  {t("Contribution Volonataire", { lng: currentLang })}
                </Radio>
              </Radio.Group>
              {priceType !=="Gratuit"&&
              <div className="radio-price-content">
              {priceType==="Contribution"&&
              <div className="flex-input">
              <div className="contr-text">Contribution Suggerre</div><Input addonAfter={<DollarCircleOutlined />} className="dollar-input" type="number" />
              
              </div>
}
              {priceType==="Payant"&&
              <>
              {payantList.map(item=>
                <div className="flex-input" key={item.id}>
                <Input addonAfter={<DollarCircleOutlined />} className="dollar-input" type="number" />
                <Input  placeholder="Description" />
                {payantList.length>1 &&
                <DeleteOutlined className="delete-price" onClick={()=>deletePrice(item)}/>}
                </div>)}
                
                <Button danger type="text"
                onClick={()=>addPayant()}
                icon={ <PlusOutlined />}>
                Ajouter un prix
    </Button>

                </>}
              
              <div className="text-align-end">
              <Select
                  defaultValue="Canada/Eastern"
                  className="time-zone-select"
                  bordered={false}
                >
                  {timeZone.map((item) => (
                    <Option value={item.value} key={item.value}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
                </div>
                </div>
}
            </div>
            <div>
            <Form
        form={form}
        layout="vertical"
        className="update-status-form"
        data-testid="status-update-form"
        onFinish={handleSubmit}
       
      >
          <div className="update-select-title">
              {t("Notes", { lng: currentLang })} 
            </div>
            <Form.Item
              name="title"
              className="status-comment-item"
              rules={[
                {
                  required: true,
                  message: "Notes required",
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Enter Notes" className="replace-input" />
            </Form.Item>
            <div className="update-select-title">
              {t("Site web de la billeteria", { lng: currentLang })}
            </div>
            <Form.Item
              name="eventPage"
              className="status-comment-item"
              rules={[
                {
                  required: false,
                  message: "Url required",
                  whitespace: true,
                },
                {
                  message: 'Enter valid url.',
                  validator: (_, value) => {
                    if (urlValidate(value)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject('Enter valid url.');
                    }
                  }
                }
              ]}
              validateTrigger="onBlur"
            >
              <Input placeholder="Enter Site Url" className="replace-input" />
            </Form.Item>
            <Form.Item className="submit-items">
          <Button
            size="large"
            
            onClick={() => {
             
                form.resetFields();
                
              
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
           
          >
            Done
          </Button>
        </Form.Item>
          </Form>
            </div>
     
    </Modal>
  );
};
export default PriceModal;
