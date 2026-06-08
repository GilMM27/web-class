import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./views/Login";
import Profile from "./views/Profile";
import ResponsiveAppBar from "./components/AppBar";
import Admin from "./views/Admin";
import Details from "./components/Details";
import LifeCycle from "./components/LifeCycle";
import useAuth from "./hooks/useAuth";
import useAdmin from "./hooks/useAdmin";

function AppLayout() {
  const [show, setShow] = useState(false);
  const { isLogin, user, token, login } = useAuth();
  const { users, addUser, delUser, updateUser } = useAdmin(token, user);

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
