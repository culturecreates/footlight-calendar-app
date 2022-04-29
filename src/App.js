import { Row,Layout, Col, Tag } from 'antd';
import './App.css';
import { useTranslation, Trans } from "react-i18next";
import 'antd/dist/antd.min.css';
import "antd/dist/antd.less";

import SelectionTag from './components/SelectionTag';
import EventCalendar from './components/EventCalendar';

const { Header, Footer, Content } = Layout;
function App() {

  const regions =[{name:"tessds",color:"#b2b4b6"},{name:"tessds",color:"#fcb043"},
  {name:"tessds",color:"#367443"},{name:"tessds",color:"#eacc20"}
,{name:"tessds",color:"#e2dd1f"},{name:"tessds",color:"#f04d46"}]
  const { t, i18n } = useTranslation();
  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <Layout>
    <Header className="app-header">Header</Header>
    <Content className="app-content">
    <div >
      
        
        
        {/* <h2>{t("Welcome to React")}</h2>
        <Row>
        <button onClick={() => changeLanguage("de")}>de</button>
        <button onClick={() => changeLanguage("en")}>en</button>
        </Row>
        
        <Trans i18nKey="welcome">trans</Trans> */}
        <Row>
      <Col flex="315px">
        <div>{t("Region")}</div>
        <div>
        <Row gutter={16} className="region-row">
          {regions.map(item=>
      <Col  span={11} style={{backgroundColor:item.color}}>
        <div className="region-col">col-6</div>
        
      </Col>
      )}
      </Row>
        </div>
        <EventCalendar/>
        <div>{t("Types")}</div>
        <div>
        {regions.map(item=>
          <SelectionTag/>)}
          </div>
         
      </Col>
      <Col flex="auto"></Col>
    </Row>
      
      
      
   
    </div>
    </Content>
    <Footer>Footer</Footer>
  </Layout>
   
  );
}

export default App;
