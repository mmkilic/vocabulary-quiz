import { React, useState, useEffect, useRef } from "react";
import { Modal, Table } from "antd";


function ModalInfo({
  isVisible,
  setIsVisible,
  data = [],
}) {

  useEffect(() => {
    if (isVisible) {
    }
  }, [isVisible]);

  const columns = [
    {
      title: "QAPair ID",
      dataIndex: "qaPairId",
      key: "qaPairId",
      width: "12%",
      ellipsis: {
        showTitle: true,
      },
      sorter: (a, b) => a.qaPairId - b.qaPairId,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "English",
      dataIndex: "english",
      key: "english",
      width: "20%",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: "Turkish",
      dataIndex: "turkish",
      key: "turkish",
      width: "20%",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: "Correct",
      dataIndex: "correct",
      key: "correct",
      width: "10%",
      ellipsis: {
        showTitle: true,
      },
      render: (text) => (
        <span style={{ color: text ? '#22c55e' : '#ef4444' }}>
          {text ? "True" : "False"}
        </span>
      ),
    },
    {
      title: "Quiz ID",
      dataIndex: "quizId",
      key: "quizId",
      width: "12%",
      ellipsis: {
        showTitle: true,
      },
    },
  ];

  const cancel = () => {
    setIsVisible(false);
  };

  return (
    <>
      <Modal
        title="Word"
        width={600}
        open={isVisible}
        onCancel={cancel}
        footer={null}
      >
        <Table
          rowKey="qaPairId"
          size="small"
          columns={columns}
          dataSource={data}
          bordered
        />
      </Modal>
    </>
  );
}

export default ModalInfo;
