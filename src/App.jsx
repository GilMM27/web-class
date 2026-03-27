import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./views/Login";
import Profile from "./views/Profile";
import ResponsiveAppBar from "./components/AppBar";

function AppLayout() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <ResponsiveAppBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
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
