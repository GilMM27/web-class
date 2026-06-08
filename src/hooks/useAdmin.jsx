import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const useAdmin = (token, user) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (token && user?.role === "admin") {
      const fetchUsers = async () => {
        try {
          const res = await fetch(`${API_URL}/users`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          setUsers(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchUsers();
    }
  }, [token, user]);

  const delUser = async (id) => {
    console.log("Deleting user:", id);
    try {
      await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const addUser = async (newUser) => {
    console.log("Adding user:", newUser.username);
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      setUsers((prevUsers) => [...prevUsers, data]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async (id, updatedUser) => {
    console.log("Updating user:", id, updatedUser);
    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await res.json();
      console.log("Update response:", data);
      setUsers((prevUsers) => prevUsers.map((u) => (u._id === id ? data : u)));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return { users, addUser, delUser, updateUser };
};

export default useAdmin;
