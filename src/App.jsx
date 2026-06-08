import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./views/Login";
import Profile from "./views/Profile";
import ResponsiveAppBar from "./components/AppBar";
import Admin from "./views/Admin";
import Details from "./components/Details";
import LifeCycle from "./components/LifeCycle";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function AppLayout() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (isLogin && token && user?.role === "admin") {
      const getUsers = async () => {
        const res = await fetch(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUsers(data);
      };
      getUsers();
    }
  }, [isLogin, token, user]);

  const login = async (userCredentials) => {
    console.log("Attempting login for:", userCredentials.username);
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
  };

  const delUser = async (id) => {
    console.log("Deleting user:", id);
    await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(users.filter((u) => u._id !== id));
  };

  const addUser = async (newUser) => {
    console.log("Adding user:", newUser.username);
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    setUsers([...users, data]);
  };

  const updateUser = async (id, updatedUser) => {
    console.log("Updating user:", id, updatedUser);
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    });
    const data = await res.json();
    console.log("Update response:", data);
    setUsers(users.map((u) => (u._id === id ? data : u)));
  };

  return (
    <>
      {isLogin && <ResponsiveAppBar user={user} />}
      <Routes>
        <Route path="/" element={<Login login={login} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        {user?.role === "admin" ? (
          <Route
            path="/admin"
            element={
              <Admin
                addUser={addUser}
                users={users}
                delUser={delUser}
                updateUser={updateUser}
              />
            }
          />
        ) : (
          <Route path="/admin" element={<Profile user={user} />} />
        )}
        <Route path="/users/:username" element={<Details users={users} />} />
      </Routes>
      <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
      {show && <LifeCycle />}
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
