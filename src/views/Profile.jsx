import React from "react";

const Profile = ({ user }) => {
  if (!user) return <div>Please log in.</div>;
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <p>Role: {user.role}</p>
      <p>ID: {user._id}</p>
    </div>
  );
};

export default Profile;
