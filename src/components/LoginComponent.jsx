import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginComponent = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }
    const res = await login(username, password);
    if (res.isLogin === true) {
      setUsername("");
      setPassword("");
      navigate("/profile");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginComponent;
