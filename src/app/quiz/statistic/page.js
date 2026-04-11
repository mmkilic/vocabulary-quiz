"use client";

import { useEffect, useState } from "react";
import { Card, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchById } from "../../redux/quizSlice";

export default function QuizStatisticPage() {
  const [quizId, setQuizId] = useState(null);
  const dispatch = useDispatch();
  const { quiz } = useSelector((store) => store.quizzes);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuizId(params.get("quizId"));
    if (quizId) {
      dispatch(fetchById(quizId));
    }
  }, [dispatch, quizId]);

  const columns = [
    {
      title: "English",
      dataIndex: "question",
      key: "question",
      ellipsis: {
        showTitle: true,
      },
      sorter: (a, b) =>
        a.question.toLowerCase().localeCompare(b.question.toLowerCase()),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Turkish",
      dataIndex: "turkish",
      key: "turkish",
      ellipsis: {
        showTitle: true,
      },
      sorter: (a, b) =>
        a.turkish.toLowerCase().localeCompare(b.turkish.toLowerCase()),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
      ellipsis: {
        showTitle: true,
      },
      sorter: (a, b) =>
        a.answer.toLowerCase().localeCompare(b.answer.toLowerCase()),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
      width: "12%",
      ellipsis: {
        showTitle: true,
      },
      sorter: (a, b) => a.result - b.result,
      sortDirections: ["descend", "ascend"],
      render: (result, record) => (
        <div style={{ textAlign: "center" }}>
          {result ? (
            <span className="text-green-600 font-semibold"> ✅</span>
          ) : (
            <span className="text-red-600 font-semibold"> ❌</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Card className="mt-6 shadow-md rounded-lg p-4">
        <h3 className="text-lg font-medium mb-3">Statistic</h3>
        <div className="mb-2">
          <strong>Quiz ID:</strong> {quiz?.id}
        </div>
        <div className="mb-2">
          <strong>Quiz Name:</strong> {quiz?.quizName}
        </div>
        <div className="mb-2">
          <strong>Question Count:</strong> {quiz?.answeredQuestionCount} /{" "}
          {quiz?.questionCount}
        </div>
        <div className="mb-2">
          <strong>Correct Answer Count:</strong> {quiz?.correctAnswerCount}
        </div>
        <div className="mb-2">
          <strong>Succession Ratio:</strong> % {quiz?.successionRatio}
        </div>
      </Card>
      <Card className="shadow-md rounded-lg">
        <Table
          rowKey="id"
          size="small"
          columns={columns}
          dataSource={quiz?.qaPair ?? []}
          pagination={{
            pageSizeOptions: [20, 50, 100, 200],
            defaultPageSize: 50,
          }}
          bordered
        />
      </Card>
    </div>
  );
}
