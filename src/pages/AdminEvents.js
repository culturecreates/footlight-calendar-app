import React, { useState, useEffect } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Layout, Card, Table, Button, Switch, Avatar, Breadcrumb, Col, Row } from "antd";

import "./AdminDashboard.css";
import { PlusOutlined, ForkOutlined } from "@ant-design/icons";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import EventCalendar from "../components/EventCalendar";
import { adminSideMenuLinks } from "../utils/Utility";
import Events from "./Events";
import Spinner from "../components/Spinner";
import ServiceApi from "../services/Service";
import SemanticSearch from "../components/SemanticSearch";
import AddEvent from "./AddEvent";

const { Header, Content, Sider } = Layout;

const AdminEvents = function ({ currentLang }) {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [defaultPage, setDefaultPage] = useState(1);
  const eventTableHeader = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (e, record) => (
        <Row className="image-name">
          <Col flex="0 1 50px">
          <Avatar size="large" src={record?.image?.uri} />
          </Col>
          <Col flex="1 1 150px">
          {record.name[currentLang]}
          </Col>
        </Row>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: 200,
      render: (e, record) => (
        <div>{moment(record.startDate).utc().format("DD-MM-YYYY")}</div>
      ),
      sorter: (a, b) => moment(a.startDate).isAfter(),
    },

    {
      title: "Location",
      dataIndex: "hasLegacyCapability",
      key: "hasLegacyCapability",
      render: (e, record) => <div>{record.locationName[currentLang]}</div>,
    },
    {
      title: "Published",
      dataIndex: "hasDependency",
      key: "hasDependency",
     width:100,
      render: (e, record) => (
        <Switch
          data-testid={`map-${record.id}`}
          onChange={(checked) => handleDelete(record, checked)}
          defaultChecked={false}
        />
      ),
    },
  ];

  const handleDelete = () => {};
  useEffect(() => {
    getEvents();
  }, []);
  const getEvents = (page = 1, filterArray = []) => {
    setLoading(true);
    ServiceApi.eventList(page, filterArray, currentLang === "en" ? "EN" : "FR")
      .then((response) => {
        if (response && response.data && response.data.data) {
          const events = response.data.data;
          setEventList(events);

          //   setTotalPage(response.data.totalPage * 20)
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const selectSemantic = (selectObj) => {
    const searchArray = [selectObj];
    getEvents(1, searchArray);
  };

  return (
    <Layout className="dashboard-layout">
      {isAdd &&
       <Breadcrumb separator=">">
    <Breadcrumb.Item onClick={()=>setIsAdd(false)}>Events</Breadcrumb.Item>
    <Breadcrumb.Item >Add Event</Breadcrumb.Item>
    
  </Breadcrumb>
}
      <div className="admin-event-header">
        <div className="header-title">Events</div>
        {!isAdd &&
        <div className="flex-align">
          <SemanticSearch
            onSelection={selectSemantic}
            onClearSearch={getEvents}
            currentLang={currentLang}
          />
          <Button type="primary" icon={<PlusOutlined />} size={"large"}
          onClick={()=>setIsAdd(true)}>
            Add Event
          </Button>
        </div>
}
      </div>
      <Card className="segment-card">
        {!isAdd ? <Table
           
              dataSource={eventList}
              columns={eventTableHeader}
              className={"event-table"}
              scroll={{x: 800, y: "calc(100% - 60px)" }}
              pagination={{
                onChange: page =>{
                  setDefaultPage(page)
                  getEvents(
                    page-1
                  )
                },
                current: defaultPage,
                pageSize: 20,
                total: totalPage,
                hideOnSinglePage: true,
                showSizeChanger: false
              }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    // setSelectedProduct(record);
                  }, // click row
                };
              }}
            /> 
            :
        <AddEvent />
            }
      </Card>
      {loading && <Spinner />}
    </Layout>
  );
};
export default AdminEvents;

AdminEvents.propTypes = {
  currentLang: PropTypes.string,
};
