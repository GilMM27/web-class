import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const Add = ({ addUser }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onsubmit = (e) => {
    e.preventDefault();
    if (!name || !username || !password) {
      alert("datos faltantes");
      return;
    }
    addUser({ name, username, password });
    setName("");
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={onsubmit}>
      <TextField value={name} onChange={(e) => setName(e.target.value)} />
      <TextField
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default Add;
