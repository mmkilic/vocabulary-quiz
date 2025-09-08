"use client";

import { useState, useEffect } from "react";
import {
    DeleteOutlined,
    LockOutlined,
    UnlockOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { message, Popconfirm, Space } from "antd";
import AppTable from "../util/AppTable";
import axios from "axios";

function QuizPage() {
    const [messageApi, contextHolder] = message.useMessage();
    const [searchApi, setSearchApi] = useState("");
    const [isUpdated, setUpdated] = useState(false);
    const [isVisibleCreate, setIsVisibleCreate] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const [email, setEmail] = useState("admin");

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
        axios.get(`http://localhost:8002/api-vocab/quiz/user`, {
            headers: { "Content-Type": "application/json" },
            params: { email: email},
        })
            .then((response) => setQuizzes(response.data));
    }, [isUpdated]);

    const handleSearchApi = async () => {
        try {
            await dispatch(fetchSearchProjects(searchApi)).unwrap();
        } catch (error) {
            console.log(error);
        }
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
            ...getColumnSearchProps("id"),
        },
        {
            title: "Total Question Count",
            dataIndex: "totalQuestionCount",
            key: "totalQuestionCount",
            width: "12%",
            ellipsis: {
                showTitle: true,
            },
            ...getColumnSearchProps("totalQuestionCount"),
        },
        {
            title: "Current Question",
            dataIndex: "activeQuestion",
            key: "activeQuestion",
            ellipsis: {
                showTitle: true,
            },
            ...getColumnSearchProps("activeQuestion"),
        },
        {
            title: "user",
            dataIndex: "user",
            key: "user",
            ellipsis: {
                showTitle: true,
            },
            render: (user) => user?.email || "N/A",
        },
        {
            title: "Actions",
            dataIndex: "operation",
            key: "operation",
            width: "8%",
            render: (_, record) =>
                words?.length >= 1 ? (
                    <Space>
                        <EditOutlined title="Edit" onClick={() => handleModalEditPerson(record)} />
                        <DeleteOutlined title="Delete" onClick={() => handleModalEditPerson(record)} />
                    </Space>
                ) : null,
        },
    ];


    return (
        <>
            {contextHolder}
            <div className="px-6 py-4 my-6 mx-4">
                <AppTable
                    dataSource={quizzes ?? []}
                    handleSearchApi={handleSearchApi}
                    setIsVisibleCreate={setIsVisibleCreate}
                    searchApi={searchApi}
                    setSearchApi={setSearchApi}
                    getColumns={(getColumnSearchProps) => columns(getColumnSearchProps)}
                />
            </div>
        </>
    );
}

export default QuizPage;