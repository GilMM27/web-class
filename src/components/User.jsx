import React from "react";

const User = ({ user, delUser }) => {
  return (
    <tr>
      <td>{user._id}</td>
      <td>{user.username}</td>
      <td>
        <button onClick={() => delUser(user._id)}>Delete</button>
      </td>
    </tr>
  );
};

export default User;
