import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./views/Login";
import Profile from "./views/Profile";
import ResponsiveAppBar from "./components/AppBar";
import Admin from "./views/Admin";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function AppLayout() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (true) {
      const getUsers = async () => {
        const res = await fetch(`${API_URL}/users`);
        const data = await res.json();
        setUsers(data);
      };
      getUsers();
    }
  }, [isLogin]);

  const login = async (user) => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    setIsLogin(data.login);
    setUser(data.user);
    return data;
  };

  const delUser = async (id) => {
    await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    });
    setUsers(users.filter((u) => u._id !== id));
  };

  const addUser = async (newUser) => {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    setUsers([...users, data]);
  };

  return (
    <>
      {isLogin && <ResponsiveAppBar />}
      <Routes>
        <Route path="/" element={<Login login={login} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route
          path="/admin"
          element={<Admin addUser={addUser} users={users} delUser={delUser} />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </>
  );
}

export default App;
