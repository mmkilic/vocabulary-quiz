import { React, useState, useEffect, useRef } from "react";
import { Button, Form, Input, Modal, message, Select } from "antd";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchStart } from "../redux/quizSlice";
import axios from "axios";

function ModalNewQuiz({ isVisible, setVisible }) {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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

  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  useEffect(() => {
    if (isVisible) {
      form.resetFields();
    }
  }, [isVisible]);

  const startAttitude = async (formValues) => {
    setLoading(true);
    try {
      const quiz = await dispatch(
        fetchStart({
          quizName: formValues.quizName,
          userName: localStorage.getItem("vocab-user")
            ? localStorage.getItem("vocab-user")
            : "guest",
        })
      ).unwrap();
      cancel();
      return quiz;
    } catch (error) {
      msg.error("Registration issue!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (formValues) => {
    const quiz = await startAttitude(formValues);
    if (quiz?.id) {
      router.push(`/quiz/question?quizId=${quiz.id}`);
    }
  };

  const cancel = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Quiz Start"
        width={600}
        confirmLoading={loading}
        open={isVisible}
        onCancel={cancel}
        footer={null}
      >
        <Form
          className="py-4"
          form={form}
          {...formLayout}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Quiz Name"
            name="quizName"
            rules={[{ required: true, message: "Mandatory Field!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Start
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalNewQuiz;
