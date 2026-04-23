import React from "react";
import Add from "../components/Add";
import User from "../components/User";

const Admin = ({ addUser, users, delUser }) => {
  return (
    <>
      <Add addUser={addUser} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Delete?</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user._id} user={user} delUser={delUser} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Admin;
