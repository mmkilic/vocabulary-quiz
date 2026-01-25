"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CaretRightOutlined } from "@ant-design/icons";
import { message, Popconfirm, Space } from "antd";
import AppTable from "../util/AppTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchByUserName, fetchSearch } from "../redux/quizSlice";
import ModalNewQuiz from "./ModalNewQuiz";

function QuizPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const router = useRouter();
  const quizzes = useSelector((store) => store.quizzes);
  const [searchApi, setSearchApi] = useState("");
  const [isVisibleNewQuiz, setVisibleNewQuiz] = useState(null);

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
    dispatch(
      fetchByUserName(
        localStorage.getItem("vocab-user")
          ? localStorage.getItem("vocab-user")
          : "guest"
      )
    );
  }, [dispatch]);

  const handleSearchApi = async () => {
    try {
      await dispatch(fetchSearch(searchApi)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalNewQuiz = async () => {
    setVisibleNewQuiz(true);
  };

  const handleModalContinue = async (record) => {
    router.push(`/quiz/question?quizId=${record.id}`);
  };

  const columns = (getColumnSearchProps) => [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "8%",
      ellipsis: {
        showTitle: true,
      },
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Quiz Name",
      dataIndex: "quizName",
      key: "quizName",
      ellipsis: {
        showTitle: true,
      },
      ...getColumnSearchProps("totalQuestionCount"),
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      width: "8%",
      ellipsis: {
        showTitle: true,
      },
      render: (completed) => (completed ? "✅" : "🔄"),
    },
    {
      title: "Ratio",
      dataIndex: "successionRatio",
      key: "successionRatio",
      width: "10%",
      ellipsis: {
        showTitle: true,
      },
      render : (successionRatio) => `% ${successionRatio}`,
    },
    {
      title: "Questions",
      dataIndex: "questionCount",
      key: "questionCount",
      width: "12%",
      ellipsis: {
        showTitle: true,
      },
      render : (_,item) => `${item.answeredQuestionCount} / ${item.questionCount}`,
    },
    {
      title: "Actions",
      dataIndex: "operation",
      key: "operation",
      width: "10%",
      ellipsis: {
        showTitle: true,
      },
      render: (_, record) =>
        quizzes.list.length >= 1 ? (
          <Space>
            <CaretRightOutlined
              title="Continue"
              onClick={() => handleModalContinue(record)}
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
          dataSource={quizzes.list ?? []}
          handleSearchApi={handleSearchApi}
          setIsVisibleCreate={handleModalNewQuiz}
          searchApi={searchApi}
          setSearchApi={setSearchApi}
          getColumns={(getColumnSearchProps) => columns(getColumnSearchProps)}
          buttonName="New Quiz"
        />
      </div>
      <ModalNewQuiz
        isVisible={isVisibleNewQuiz}
        setVisible={setVisibleNewQuiz}
      />
    </>
  );
}

export default QuizPage;
