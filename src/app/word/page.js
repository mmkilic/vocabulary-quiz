"use client";

import { useState, useEffect } from "react";
import { EditOutlined } from "@ant-design/icons";
import { message, Popconfirm, Space } from "antd";
import AppTable from "../util/AppTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchAll, fetchSearch } from "../redux/wordSlice";
import ModalCreateAndEdit from "./ModalCreateAndEdit";

function WordPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const [searchApi, setSearchApi] = useState("");
  const [isUpdated, setUpdated] = useState(false);
  const [isVisibleCreateAndEdit, setVisibleCreateAndEdit] = useState(false);
  const words = useSelector((store) => store.words);
  const [selectedWord, setSelectedWord] = useState(null);

  const msg = {
    error: (errorMessage) => {
      messageApi.open({
        type: "error",
        content: errorMessage,
        duration: 10,
      });
    },
    success: (successMessage) => {
      messageApi.open({
        type: "success",
        content: successMessage,
        duration: 5,
      });
    },
  };

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch, isUpdated]);

  const handleSearchApi = async () => {
    try {
      await dispatch(fetchSearch(searchApi)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalCreate = async () => {
    setSelectedWord(null);
    setVisibleCreateAndEdit(true);
  };

  const handleModalEdit = async (record) => {
    setSelectedWord(record);
    setVisibleCreateAndEdit(true);
  };

  const columns = (getColumnSearchProps) => [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "6%",
      ellipsis: {
        showTitle: true,
      },
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "English",
      dataIndex: "english",
      key: "english",
      width: "13%",
      ellipsis: {
        showTitle: true,
      },
      ...getColumnSearchProps("english"),
    },
    {
      title: "Turkish",
      dataIndex: "turkish",
      key: "turkish",
      width: "13%",
      ellipsis: {
        showTitle: true,
      },
      ...getColumnSearchProps("turkish"),
    },
    {
      title: "Synonym",
      dataIndex: "synonym",
      key: "synonym",
      ellipsis: {
        showTitle: true,
      },
      ...getColumnSearchProps("synonym"),
    },
    {
      title: "English-English",
      dataIndex: "english2English",
      key: "english2English",
      ellipsis: {
        showTitle: true,
      },
      ...getColumnSearchProps("english2English"),
    },
    {
      title: "Sentence",
      dataIndex: "sentence",
      key: "sentence",
      ellipsis: {
        showTitle: true,
      },
      ...getColumnSearchProps("sentence"),
    },
    {
      title: "Actions",
      dataIndex: "operation",
      key: "operation",
      width: "8%",
      render: (_, record) =>
        words.list?.length >= 1 ? (
          <Space>
            <EditOutlined
              title="Edit"
              onClick={() => handleModalEdit(record)}
            />
          </Space>
        ) : null,
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="px-6 py-4 my-6 mx-4">
        <AppTable
          dataSource={words?.list ?? []}
          handleSearchApi={handleSearchApi}
          setIsVisibleCreate={handleModalCreate}
          searchApi={searchApi}
          setSearchApi={setSearchApi}
          getColumns={(getColumnSearchProps) => columns(getColumnSearchProps)}
        />
      </div>
      <ModalCreateAndEdit
        isVisible={isVisibleCreateAndEdit}
        setIsVisible={setVisibleCreateAndEdit}
        isUpdated={isUpdated}
        setUpdated={setUpdated}
        word={selectedWord}
      />
    </>
  );
}

export default WordPage;
