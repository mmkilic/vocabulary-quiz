"use client";

import Link from "next/link";
import { Menu, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import routes from "../routes";

export default function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const menuItems = routes
    .filter((route) => route.showInNavbar && (!route.requiresAuth || isLoggedIn))
    .map((route) => ({
      key: route.path,
      label: <Link href={route.path}>{route.name}</Link>,
      icon: route.icon || null,
    }));

  return (
    <div className="shadow-md bg-white">
      <div className="flex justify-between items-center px-10">
        <Menu
          mode="horizontal"
          items={menuItems}
          selectable={false}
          style={{ width: "30%", justifyContent: "space-between" }}
        />

        <div>
          {!isLoggedIn ? (
            <Link href="/login">
              <Button type="primary">Login</Button>
            </Link>
          ) : (
            <Button type="default" onClick={() => dispatch(logout())}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
