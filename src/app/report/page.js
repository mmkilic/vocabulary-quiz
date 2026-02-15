"use client";

import { useState, useEffect } from "react";
import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import { message, Popconfirm, Space, Progress } from "antd";
import AppTable from "../util/AppTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchAll, fetchSearch } from "../redux/reportSlice";
import ModalInfo from "./ModalInfo";
import { useAuth } from "../components/AuthContext";
import ModalEditLevel from "./ModalEditLevel";

function ReportPage() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [searchApi, setSearchApi] = useState("");
  const [isVisibleInfo, setVisibleInfo] = useState(false);
  const reports = useSelector((store) => store.reports);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isVisibleEditLevel, setVisibleEditLevel] = useState(false);

  useEffect(() => {
    if(user){
      dispatch(fetchAll(user));
    }
  }, [dispatch, user]);

  const handleSearchApi = async () => {
    try {
      await dispatch(fetchSearch({
        user: user,
        search: searchApi
      })).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalCreate = async () => {
    // No implementation needed for info modal
  };

  const handleModalInfo = async (record) => {
    setSelectedReport(record);
    setVisibleInfo(true);
  };

  const columns = (getColumnSearchProps) => [
    {
      title: "Word Id",
      dataIndex: "wordId",
      key: "wordId",
      width: "7%",
      ellipsis: {
        showTitle: true,
      },
      sorter: (a, b) => a.wordId - b.wordId,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "English",
      dataIndex: "english",
      key: "english",
      width: "15%",
      ellipsis: {
        showTitle: true,
      },
      sorter: (a, b) => a.english.toLowerCase().localeCompare(b.english.toLowerCase()),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Turkish",
      dataIndex: "turkish",
      key: "turkish",
      width: "15%",
      ellipsis: {
        showTitle: true,
      },
      sorter: (a, b) => a.turkish.toLowerCase().localeCompare(b.turkish.toLowerCase()),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Synonym",
      dataIndex: "synonym",
      key: "synonym",
      className: "hidden md:table-cell",
      ellipsis: {
        showTitle: true,
      },
      ...getColumnSearchProps("synonym"),
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      className: "hidden md:table-cell",
      width: "8%",
      ellipsis: {
        showTitle: true,
      },
      sorter: (a, b) => a.level?.toLowerCase().localeCompare(b.level?.toLowerCase()),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("level"),
    },
    {
      title: "Figures",
      dataIndex: "figures",
      key: "figures",
      width: "10%",
      ellipsis: {
        showTitle: true,
      },
      render: (_, record) => (
        <div style={{ textAlign: 'center' }}>
          {record?.totalCorrectAnswerCount} / {record?.totalAnsweredQuestionCount}
        </div>
      ),
    },
    {
      title: "Succession Rate",
      dataIndex: "successionRate",
      key: "successionRate",
      width: "16%",
      ellipsis: {
        showTitle: true,
      },
      sorter: (a, b) => a.successionRate - b.successionRate,
      sortDirections: ["descend", "ascend"],
      render: (text) => (
        <Progress percent={Math.round(text * 100)} size="small" />
      ),
    },
    {
      title: "Actions",
      dataIndex: "operation",
      key: "operation",
      width: "6%",
      ellipsis: {
        showTitle: true,
      },
      render: (_, record) =>
        reports.list?.length >= 1 ? (
          <div style={{ textAlign: 'center' }}>
            <Space>
              <InfoCircleOutlined
                key="info"
                title="info"
                onClick={() => handleModalInfo(record)}
              />
              <EditOutlined 
                key="edit"
                title="edit level"
                onClick={() => {
                  setSelectedReport(record);
                  setVisibleEditLevel(true);
                }}
              />
            </Space>
          </div>
        ) : null,
    },
  ];

  return (
    <>
      <div className="px-6 py-4 my-6 mx-4">
        <AppTable
          dataSource={reports?.list ?? []}
          handleSearchApi={handleSearchApi}
          setIsVisibleCreate={handleModalCreate}
          searchApi={searchApi}
          setSearchApi={setSearchApi}
          getColumns={(getColumnSearchProps) => columns(getColumnSearchProps)}
        />
      </div>
      <ModalInfo
        isVisible={isVisibleInfo}
        setIsVisible={setVisibleInfo}
        data={selectedReport?.answerList || []}
      />
      <ModalEditLevel
        isVisible={isVisibleEditLevel}
        setVisible={setVisibleEditLevel}
        data={selectedReport}
      />
    </>
  );
}

export default ReportPage;
