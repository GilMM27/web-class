import React from "react";
import Add from "../components/Add";
import User from "../components/User";

const Admin = ({ addUser, users, delUser, updateUser }) => {
  return (
    <>
      <Add addUser={addUser} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User
              key={user._id}
              user={user}
              delUser={delUser}
              updateUser={updateUser}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Admin;
