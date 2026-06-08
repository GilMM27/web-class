import React, { useState } from "react";
import { Link } from "react-router-dom";

const User = ({ user, delUser, updateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [username, setUsername] = useState(user.username || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(user.role || "user");

  const startEditing = () => {
    setName(user.name || "");
    setUsername(user.username || "");
    setRole(user.role || "user");
    setPassword("");
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const onSave = () => {
    const updatedData = { name, username, role };
    if (password) updatedData.password = password;
    updateUser(user._id, updatedData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <tr>
        <td>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </td>
        <td>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </td>
        <td>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </td>
        <td>
          <input
            type="password"
            placeholder="New Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={onSave}>Save</button>
          <button onClick={cancelEditing}>Cancel</button>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>
        <Link to={`/users/${user._id}?react=889`}>{user._id}</Link>
      </td>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.role}</td>
      <td>
        <button onClick={startEditing}>Edit</button>
        <button onClick={() => delUser(user._id)}>Delete</button>
      </td>
    </tr>
  );
};

export default User;
