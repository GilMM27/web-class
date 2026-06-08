import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (userCredentials) => {
    console.log("Attempting login for:", userCredentials.username);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });
      const data = await res.json();
      console.log("Login response:", data);
      if (data.login) {
        setIsLogin(true);
        setUser(data.user);
        setToken(data.token);
      }
      return data;
    } catch (error) {
      console.error("Login error:", error);
      return { login: false, msg: "Server error" };
    }
  };

  const logout = () => {
    setIsLogin(false);
    setUser(null);
    setToken(null);
  };

  return { isLogin, user, token, login, logout };
};

export default useAuth;
