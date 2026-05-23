import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import React, { useState } from "react";

const Add = ({ addUser }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const onsubmit = (e) => {
    e.preventDefault();
    if (!name || !username || !password) {
      alert("datos faltantes");
      return;
    }
    addUser({ name, username, password, role });
    setName("");
    setUsername("");
    setPassword("");
    setRole("user");
  };

  return (
    <form onSubmit={onsubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
      <TextField label="Name" size="small" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField
        label="Username"
        size="small"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        size="small"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormControl size="small" style={{ minWidth: 120 }}>
        <InputLabel>Role</InputLabel>
        <Select
          value={role}
          label="Role"
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" type="submit">Add</Button>
    </form>
  );
};

export default Add;
