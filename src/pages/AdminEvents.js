import React, { useState, useEffect } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Layout, Card, Table, Button, Switch, Avatar, Breadcrumb, Col, Row } from "antd";
import { useTranslation, Trans } from "react-i18next";
import "./AdminDashboard.css";
import { PlusOutlined, ForkOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const eventTableHeader = [
    {
      title: t("Name", { lng: currentLang }),
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
      title: t("StartDate", { lng: currentLang }),
      dataIndex: "startDate",
      key: "startDate",
      width: 200,
      render: (e, record) => (
        <div>{moment(record.startDate).utc().format("DD-MM-YYYY")}</div>
      ),
      sorter: (a, b) => moment(a.startDate).isAfter(),
    },

    {
      title: t("Location", { lng: currentLang }),
      dataIndex: "hasLegacyCapability",
      key: "hasLegacyCapability",
      render: (e, record) => <div>{record.locationName[currentLang]}</div>,
    },
    {
      title: t("Published", { lng: currentLang }),
      dataIndex: "hasDependency",
      key: "hasDependency",
     width:120,
      render: (e, record) => (
        <Switch
          className="publish-switch"
          onChange={(checked,event) => handleDelete(checked,record, event)}
          defaultChecked={false}
        />
      ),
    },
  ];

  const handleDelete = (checked,record,event) => {
    event.stopPropagation()
  };
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
    <Breadcrumb.Item onClick={()=>setIsAdd(false)}>{t("Events", { lng: currentLang })}</Breadcrumb.Item>
    <Breadcrumb.Item >{t("AddEvent", { lng: currentLang })}</Breadcrumb.Item>
    
  </Breadcrumb>
}
      <Row className="admin-event-header">
        <Col className="header-title" flex="0 1 300px">{t("Events", { lng: currentLang })}</Col>
        {!isAdd &&
        <Col className="flex-align">
          <SemanticSearch
            onSelection={selectSemantic}
            onClearSearch={getEvents}
            currentLang={currentLang}
          />
          <Button type="primary" icon={<PlusOutlined />} size={"large"}
          onClick={()=>setIsAdd(true)}>
            Add {t("Event", { lng: currentLang })}
          </Button>
        </Col>
}
      </Row>
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
                    event.stopPropagation()
                    navigate(`/admin/events/${record.uuid}`);
                    // setSelectedProduct(record);
                  }, // click row
                };
              }}
            /> 
            :
        <AddEvent currentLang={currentLang}/>
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
