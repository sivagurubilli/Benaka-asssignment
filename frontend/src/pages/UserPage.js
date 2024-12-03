import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUser();
  }, [baseURL, token]);

  return (
    <div className="container mt-4">
      <h1>User Profile</h1>
      {user ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Name: {user.username}</h5>
            <p className="card-text">Email: {user.email}</p>
            <p className="card-text">Role: {user.role}</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/update-profile/${user._id}`)}
            >
              Update Profile
            </button>
          </div>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UserPage;
