import React,{useState,useEffect} from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Layout, Menu, Avatar, Dropdown, Switch } from "antd";

import "./AdminDashboard.css";
import {
    RightOutlined ,ForkOutlined
} from "@ant-design/icons";
import {
    Link,
    Route,
    Routes,
    useLocation,
    useNavigate,
  } from "react-router-dom";
import EventCalendar from "../components/EventCalendar";
import { adminSideMenuLinks } from "../utils/Utility";
import EventDetails from "./EventDetails";
import { useTranslation, Trans } from "react-i18next";
import AdminEvents from "./AddEvent/AdminEvents";
import AdminContacts from "./AddContact/AdminContact";
import AdminPlaces from "./AdminPlace/AdminPlaces";
import Organization from "./AdminOrg/Organization";
import Taxonomy from "./Taxonomy/Taxonomy";

const { Header, Content, Sider } = Layout;

const AdminDashboard = function ({ item, currentLang }) {
    const [routePath, setRoutePath] = useState("/admin/events");
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const sideMenuLinks= adminSideMenuLinks;
    useEffect(() => {
        setRoutePath(location.pathname);
       
      }, [location]);
  return (
    <Layout className="dashboard-layout-home">
    <Sider width={250} className="dashboard-sider">
      {/* <img src={WalmartIcon} alt="logo" className="dashboard-logo" /> */}
      <div className="app-text">{ "Culture Outaouais"}</div>

      <Menu
        mode="inline"
        selectedKeys={[routePath]}
        style={{ height: "100%", borderRight: 0 }}
      >
        {sideMenuLinks.map((item) => (
          <Menu.Item key={item.link} className="side-menu-item">
            <div className="side-menu-div">
             
              <Link to={item.link}>{t(item.name, { lng: currentLang })}</Link>
              {routePath.includes(item.link) && (
                <RightOutlined className="selected-right-arrow" />
              )}
            </div>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
    <Layout style={{ padding: "0 0px 0px" }}>
    
      <Content
        className="admin-content">
       
        <Routes>
          <Route path="events" element={<AdminEvents currentLang={currentLang} />} />
          <Route path="add-event" element={<AdminEvents currentLang={currentLang} />} />
          <Route path="places" element={<AdminPlaces currentLang={currentLang} />} />
          <Route path="add-place" element={<AdminPlaces currentLang={currentLang} />} />
          <Route path="contacts" element={<AdminContacts currentLang={currentLang} />} />
          <Route path="add-contact" element={<AdminContacts currentLang={currentLang} />} />
          <Route path="organization" element={<Organization currentLang={currentLang} />} />
          <Route path="add-organization" element={<Organization currentLang={currentLang} />} />
          <Route path="taxonomy" element={<Taxonomy currentLang={currentLang} />} />
          <Route path="add-taxonomy" element={<Taxonomy currentLang={currentLang} />} />
          <Route path="events/:eventId" element={<EventDetails currentLang={currentLang} isAdmin/>} />
        </Routes>
      </Content>
    </Layout>
  </Layout>
  );
};
export default AdminDashboard;

AdminDashboard.propTypes = {
  currentLang: PropTypes.string,
};
