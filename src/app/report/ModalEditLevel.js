import { React, useState, useEffect, useRef } from "react";
import { Button, Form, Input, Modal, message, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpdateLevel } from "../redux/reportSlice";

const { Option } = Select;

function ModalEditLevel({ isVisible, setVisible, data }) {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const levels = useSelector((state) => state.enums.levels);
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
    if (isVisible && data) {
      form.setFieldsValue({
        wordId: data.wordId,
        level: data.level,
      });
    }
  }, [isVisible, data, form]);

  const onFinish = async (formValues) => {
    setLoading(true);
    try {
      const word = await dispatch(
        fetchUpdateLevel({
          wordId: formValues.wordId,
          level: formValues.level,
        }),
      ).unwrap();

      msg.success("Level updated successfully!");
      cancel();
    } catch (error) {
      msg.error("Update failed!");
      console.log(error);
    } finally {
      setLoading(false);
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
        title="Edit Level"
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
          <Form.Item label="Word ID" name="wordId">
            <Input disabled={true} />
          </Form.Item>

          <Form.Item label="Level" name="level">
            <Select placeholder="Select">
              {Array.isArray(levels) &&
                levels.map((l) => (
                  <Option key={l} value={l}>
                    {`${l}`}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalEditLevel;
