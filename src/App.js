import { Row, Layout, Col, Tag, Card, Radio, ConfigProvider } from "antd";
import "./App.css";
import { useTranslation, Trans } from "react-i18next";
import "antd/dist/antd.min.css";
import "antd/dist/antd.less";
import { useState } from "react";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/fr_CA";
import moment from "moment";
import "moment/locale/fr-ca";
import Events from "./pages/Events";

moment.locale("en");

const { Header, Footer, Content } = Layout;
function App() {
  const [locale, setLocale] = useState();
 
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
 
  const changeLocale = (e) => {
    const localeValue = e.target.value;
    setLocale(localeValue);
    if (!localeValue) {
      moment.locale("en");
    } else {
      moment.locale("fr-ca");
    }
  };

  return (
    <Layout className="events-app-layout">
      <Header className="app-header">Header</Header>

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
       <Events/>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
