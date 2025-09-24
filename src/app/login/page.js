"use client";

import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../components/AuthContext"; // ✅ use the context

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth(); // ✅ get login function from context
  const [ready, setReady] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

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
    if (typeof window !== "undefined") {
      setReady(true); // ensures localStorage exists
    }
  }, []);

  const onFinish = async (values) => {
    const name = values.user?.trim();
    const password = values.password?.trim();

    try {
      const appUser = await axios.post(
        `${apiUrl}/user/login`,
        { name, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (appUser?.data) {
        // ✅ instead of writing localStorage here, use AuthContext
        login(appUser.data.name);
        msg.success("Login successful");
        router.push("/");
      } else {
        msg.error("Invalid username or password");
      }
    } catch (err) {
      msg.error("Login failed");
    }
  };

  if (!ready) return null; // avoid SSR crash

  return (
    <>
      {contextHolder}
      <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="User" name="user" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
