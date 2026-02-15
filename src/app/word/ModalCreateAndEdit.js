import { React, useState, useEffect, useRef } from "react";
import { Button, Form, Input, Modal, message, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchSave } from "../redux/wordSlice";

const { Option } = Select;

function ModalCreateAndEdit({
  isVisible,
  setIsVisible,
  isUpdated,
  setUpdated,
  word = null,
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const levels = useSelector((state) => state.enums.levels);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState("");

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
      if(word !== null){
        form.setFieldsValue({
        ...word,
      });
      }
      else{
        form.resetFields();
      }
    }
  }, [isVisible]);

  const saveAttitude = async (formValues) => {
    setLoading(true);
    const payload = {
      ...formValues,
    };

    await dispatch(fetchSave(payload))
      .unwrap()
      .then(() => {
        msg.success("word has been created.");
        setUpdated(!isUpdated);
        cancel();
      })
      .catch((error) => {
        msg.error("Registration issue!");
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const onFinish = async (formValues) => {
    saveAttitude(formValues);
  };

  const cancel = () => {
    form.resetFields();
    setIsVisible(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Word"
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
          <Form.Item label="ID" name="id">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="English"
            name="english"
            rules={[{ required: true, message: "Mandatory Field!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Turkish"
            name="turkish"
            rules={[{ required: true, message: "Mandatory Field!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="English To English" name="english2English">
            <Input />
          </Form.Item>

          <Form.Item label="Synonym" name="synonym">
            <Input />
          </Form.Item>

          <Form.Item label="Sentence" name="sentence">
            <Input />
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
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalCreateAndEdit;
