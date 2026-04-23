import React from "react";

const Profile = ({ user }) => {
  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {user.username}!</p>
      <p>id: {user._id}</p>
    </div>
  );
};

export default Profile;
