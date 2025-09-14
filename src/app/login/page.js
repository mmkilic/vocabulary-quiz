"use client";

import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReady(true); // ensures localStorage exists
    }
  }, []);

  const onFinish = (values) => {
    const user = values.user?.trim();
    const password = values.password?.trim();

    if (user === "admin" && password === "admin123") {
      localStorage.setItem("user", "adm-mmk");
      router.push("/");
    } else {
      message.error("Invalid username or password");
    }
  };

  if (!ready) return null; // avoid SSR crash

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item label="User" name="user" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
