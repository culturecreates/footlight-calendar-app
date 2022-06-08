import React, { useState, useEffect } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Layout, Card, Table, Button, Switch, Avatar, Breadcrumb, Col, Row } from "antd";
import { useTranslation, Trans } from "react-i18next";
import "./AdminDashboard.css";
import { PlusOutlined, ForkOutlined } from "@ant-design/icons";
import { useNavigate,useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import ServiceApi from "../services/Service";
import SemanticSearch from "../components/SemanticSearch";
import AddEvent from "./AddEvent";


const AdminEvents = function ({ currentLang }) {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [defaultPage, setDefaultPage] = useState(1);
  const [eventDetails, setEventDetails] = useState()
  const navigate = useNavigate();
  const location = useLocation();

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
    if(location.pathname.includes("admin/add-event"))
    {
      setIsAdd(true)
      const search = window.location.search;
    const params = new URLSearchParams(search);
    const eventId = params.get("id");
    if(eventId)
    getEventDetails(eventId)
    }
    else
    {
      setIsAdd(false)
      getEvents();
      setEventDetails()
    }
   
  }, [location]);

  const getEventDetails = (id) => {
    setLoading(true);
    ServiceApi.getEventDetail(id)
      .then((response) => {
        if (response && response.data && response.data) {
          const events = response.data;
          setEventDetails(events)
          if (response.data.StatusCode !== 400) {
             
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const getEvents = (page = 1, filterArray = []) => {
    setLoading(true);
    ServiceApi.eventList(page, filterArray, currentLang === "en" ? "EN" : "FR")
      .then((response) => {
        if (response && response.data && response.data.data) {
          const events = response.data.data;
          setEventList(events);
            if(response.data.totalCount)
            setTotalPage(response.data.totalCount)
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
    <Breadcrumb.Item onClick={()=>navigate(`/admin/events`)}>{t("Events", { lng: currentLang })}</Breadcrumb.Item>
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
          onClick={()=>navigate(`/admin/add-event`)}>
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
                    page
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
                    navigate(`/admin/add-event/?id=${record.uuid}`);
                    // setSelectedProduct(record);
                  }, // click row
                };
              }}
            /> 
            :
        <AddEvent currentLang={currentLang} eventDetails={eventDetails}/>
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
