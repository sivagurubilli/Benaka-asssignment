import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get(`${baseURL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [baseURL, token]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`${baseURL}/api/users/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setUsers(users.filter((user) => user._id !== id));
        })
        .catch((error) => console.error("Error deleting user:", error));
    }
  };

  return (
    <div className="container mt-4">
      <h1>Admin Page</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/add-user")}
      >
        Add User
      </button>
      <UserTable users={users} onDelete={handleDelete} />
    </div>
  );
};

export default AdminPage;
