import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();

  return (
    <div>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button onClick={() => navigate("/profile")}>Login</button>
    </div>
  );
};

export default LoginComponent;
