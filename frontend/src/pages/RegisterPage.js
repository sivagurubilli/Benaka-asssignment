import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // Default role
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
  const token = localStorage.getItem('accessToken');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/auth/register`,{
        username:formData.username,
        email:formData.email,
        password:formData.password,
        role:formData.role,
      },{headers: {
        Authorization: `Bearer ${token}`,
      }});
      setSuccess("Registration successful! Please log in.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center shadow p-4 rounded">
        {/* Left Side Image */}
        <div className="col-md-6 text-center">
          <img
            src="https://benakagoldcompany.com/logo/benakaLogo.webp"
            alt="Register Illustration"
            className="img-fluid rounded"
          />
        </div>

        {/* Right Side Form */}
        <div className="col-md-4">
          <h1 className="mb-4 text-center">Register</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Role */}
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                 <option value="">Select</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="text-center mt-3">
            <button type="submit" className="btn btn-primary w-50">
              Register
            </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-primary">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
