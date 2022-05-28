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
        <div className="header-links">
        <Image
    width={200}
    preview={false}
    src="https://toutculture.ca/images/logo_header.svg"
  />
      <div className="footer-title">FootLight</div>
        {/* <div className="footer-cal">{t("headerText", { lng: currentLang })}</div> */}
      <div className="header-text">
            <div className={isEnglish?"active-admin":"active-user"}>French</div>
            <Switch checked={isEnglish} data-testid="admin-user-switch"
           className="switch-user" onChange={onChange}  />
            <div className={!isEnglish?"active-admin":"active-user"}>English</div> </div>
            </div>
      </Header>

      <Content className="app-content">
        {/* <div className="change-locale">
          <span style={{ marginRight: 16 }}>Change locale of components: </span>
          <Radio.Group value={locale} onChange={changeLocale}>
            <Radio.Button key="en" value={enUS}>
              English
            </Radio.Button>
            <Radio.Button key="fr" value={zhCN}>
              中文
            </Radio.Button>
          </Radio.Group>
        </div> */}
         {/* <h2>{t("Welcome to React")}</h2>
        <Row>
        <button onClick={() => changeLanguage("de")}>de</button>
        <button onClick={() => changeLanguage("en")}>en</button>
        </Row>
        
        <Trans i18nKey="welcome">trans</Trans> */}
        <Router>
        <Routes>
          <Route path="/" element={<Events currentLang={currentLang} locale={locale}/>} />
          <Route path="/events/:eventId" element={<EventDetails currentLang={currentLang}/>} />

          {/* <Route  path="/home" element={Dashboard} />
    <Route  path="/" element={Login} /> */}
        </Routes>
      </Router>
      </Content>
      <Footer className="app-footer">
        <div className="footer-links">
        <div className="footer-title">FootLight</div>
        <div className="footer-cal">{t("headerText", { lng: currentLang })}</div>
        </div>
        <div className="footer-copy">
          <div>©2022 {t("CopyReserve", { lng: currentLang })}&nbsp;&nbsp;&nbsp;&nbsp;Culture Outaouais </div>
          <div>{t("Powered", { lng: currentLang })} <span className="footer-name">Footlight</span> </div>
        </div>
      </Footer>
    </Layout>
  );
}

export default App;
