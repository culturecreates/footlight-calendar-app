import { Row, Layout, Col, Tag, Card, Radio, ConfigProvider } from "antd";
import "./App.css";
import { useTranslation, Trans } from "react-i18next";
import "antd/dist/antd.min.css";
import "antd/dist/antd.less";
import React,{ useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import moment from "moment";


const { Header, Footer, Content } = Layout;
function App() {
  const [locale, setLocale] = useState();
  const [currentLang, setCurrentLang] = useState("fr");
 
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng)
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

  return (
    <Layout className="events-app-layout">
      <Header className="app-header" onClick={()=>changeLanguage("en")}>Header</Header>

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
          <Route path="/" element={<Events currentLang={currentLang}/>} />
          <Route path="/events/:eventId" element={<EventDetails currentLang={currentLang}/>} />

          {/* <Route  path="/home" element={Dashboard} />
    <Route  path="/" element={Login} /> */}
        </Routes>
      </Router>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
