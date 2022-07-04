import { Row, Layout, Col, Tag, Card, Radio, ConfigProvider, Switch, Image } from "antd";
import "./App.css";
import { useTranslation, Trans } from "react-i18next";
import "antd/dist/antd.min.css";
import "antd/dist/antd.less";
import React,{ useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import moment from "moment";
import enUS from "antd/lib/locale/en_US";
import frCA from "antd/lib/locale/fr_CA";
import "moment/locale/fr-ca";
import AdminDashboard from "./pages/AdminDasboard";
moment.locale("fr-ca");


const { Header, Footer, Content } = Layout;
function App() {
  const [locale, setLocale] = useState(frCA);
  const [currentLang, setCurrentLang] = useState("fr");
  const [isEnglish, setIsEnglish] = useState(false);

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng)
    setLocale(frCA)
    moment.locale("fr-ca");
  };
 
  // const changeLocale = (e) => {
  //   const localeValue = e.target.value;
  //   setLocale(localeValue);
  //   if (!localeValue) {
  //     moment.locale("en");
  //   } else {
  //     moment.locale("fr-ca");
  //   }
  // };
  function onChange(checked) {
    setIsEnglish(checked)
    if(!checked){
      i18n.changeLanguage("fr");
     setCurrentLang("fr")
     setLocale(frCA)
     moment.locale("fr-ca");
    }
    
    // window.location.href = '/user/capability' ;  
    else
    {
      i18n.changeLanguage("en");
     setCurrentLang("en")
     setLocale(enUS)
     moment.locale("en");
    }
   
    // window.location.href = '/admin/segment' ;
    
    
  }

  return (
    <Layout className="events-app-layout">
      <Header className="app-header">
      <Row justify="space-between" className="header-links">
      <Col xs={{
        span: 12,
        offset: 0,
      }} md={{ span: 8 }} lg={{ span: 8 }}>
        <Image
        className="logo-image"
    width={200}
    preview={false}
    src="https://toutculture.ca/images/logo_header.svg"
  />
  </Col>
  <Col  xs={{
        span: 0,
        offset: 0,
      }}
      md={{ span: 8 }} lg={{ span: 8 }}>
      <div className="footer-title">FootLight</div>
      </Col>
        {/* <div className="footer-cal">{t("headerText", { lng: currentLang })}</div> */}
        <Col xs={{
        span: 12,
        offset: 0,
      }} md={{ span: 8 }} lg={{ span: 8 }}>
      <div className="header-text">
            <div className={isEnglish?"active-admin":"active-user"}>French</div>
            <Switch checked={isEnglish} data-testid="admin-user-switch"
           className="switch-user" onChange={onChange}  />
            <div className={!isEnglish?"active-admin":"active-user"}>English</div> </div>
            </Col>
         </Row>
      </Header>

      <Content className="app-content">
       
        <Router>
        <Routes>
          <Route path="/" element={<Events currentLang={currentLang} locale={locale}/>} />
          <Route path="/events/:eventId" element={<EventDetails currentLang={currentLang}/>} />

          <Route path="/admin/*" element={<AdminDashboard currentLang={currentLang} locale={locale}/>} />
        </Routes>
      </Router>
      </Content>
      <Footer className="app-footer">
        <Row className="footer-links">
          <Col>
        <div className="footer-title">FootLight</div>
        </Col>
        <Col>
        <div className="footer-cal">{t("headerText", { lng: currentLang })}</div>
        </Col>
        </Row>
        <div className="footer-copy">
          <div>©2022 {t("CopyReserve", { lng: currentLang })}&nbsp;&nbsp;&nbsp;&nbsp;Culture Outaouais </div>
          <div>{t("Powered", { lng: currentLang })} <span className="footer-name">Footlight</span> </div>
        </div>
      </Footer>
    </Layout>
  );
}

export default App;
