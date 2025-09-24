"use client";

import Link from "next/link";
import { Menu, Button } from "antd";
import routes from "../routes";
import { useAuth } from "../components/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const admin = user === "mehmet";

  const menuItems = routes
    .filter((r) => r.showInNavbar && (!r.requiresAuth || admin))
    .map((r) => ({
      key: r.path,
      label: <Link href={r.path}>{r.name}</Link>,
      icon: r.icon || null,
    }));

  return (
    <div className="shadow-md bg-white">
      <div className="flex justify-between items-center px-10">
        <Menu
          mode="horizontal"
          items={menuItems}
          selectable={false}
          style={{ flex: 1, maxWidth: 400 }}
        />
        <div>
          {user ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Link href="/login">
              <Button type="primary">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
