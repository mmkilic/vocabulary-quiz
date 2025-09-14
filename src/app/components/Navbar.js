"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Menu, Button } from "antd";
import routes from "../routes";


export default function Navbar() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
  if (typeof window === "undefined") return;

  const checkAuth = () => setAuth(Boolean(localStorage.getItem("user")));

  checkAuth(); // initial check
  router.refresh?.(); // optional: force refresh in Next 13+

  // listen to route changes
  window.addEventListener("storage", checkAuth);
  return () => window.removeEventListener("storage", checkAuth);
}, [router]);

  const menuItems = useMemo(
    () =>
      routes
        .filter((r) => r.showInNavbar && (!r.requiresAuth || auth))
        .map((r) => ({
          key: r.path,
          label: <Link href={r.path}>{r.name}</Link>,
          icon: r.icon || null,
        })),
    [auth]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setAuth(false);
    router.push("/");
  }, [router]);

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
          {auth ? (
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
