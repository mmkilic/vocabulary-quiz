"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // initial load from localStorage
    if (typeof window !== "undefined") {
      setUser(localStorage.getItem("vocab-user"));
    }
  }, []);

  const login = (name) => {
    localStorage.setItem("vocab-user", name);
    setUser(name);
  };

  const logout = () => {
    localStorage.removeItem("vocab-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
