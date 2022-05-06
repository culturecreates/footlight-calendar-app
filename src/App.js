import { Row,Layout, Col, Tag, Card } from 'antd';
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
const event ={
  name:"sdfjkhdkhd jdfjh",
  date:"12jan-18jan",
  desc:" sdsjh fehvdjk kdcjkdh dfbkjd"
}
  const { t, i18n } = useTranslation();
  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <Layout className="events-app-layout">
    <Header className="app-header">Header</Header>
    <Content className="app-content">
    <div className="event-layout">
      
        
        
        {/* <h2>{t("Welcome to React")}</h2>
        <Row>
        <button onClick={() => changeLanguage("de")}>de</button>
        <button onClick={() => changeLanguage("en")}>en</button>
        </Row>
        
        <Trans i18nKey="welcome">trans</Trans> */}
      <div className="side-filter">
        <div className="filter-type">{t("Region")}</div>
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
        <div className="filter-type">{t("Types")}</div>
        <div>
        {regions.map(item=>
          <SelectionTag/>
          )}
          </div>
          <div className="filter-type">{t("Publics")}</div>
        <div>
        {regions.map(item=>
          <SelectionTag/>
          )}
          </div>  
         
      </div>
      <div className="right-events">
        <div className="selected-filter">
      {regions.map(item=>
          <SelectionTag closeButton type="region"/>
          )}
          </div>
      <Row className="events-row">
      {regions.map(item=>
      
      <Col>
          <div className="event-item">
            <div>
            <div className="event-date">{event.date}</div>
            </div>
            <div className="event-detail">
            <div className="event-desc">{event.desc}</div>
            <div className="event-name">{event.name}</div>
            </div>
          </div>
          </Col>
      )}
      </Row>
      </div>
  
      
      
      
   
    </div>
    </Content>
    <Footer>Footer</Footer>
  </Layout>
   
  );
}

export default App;
