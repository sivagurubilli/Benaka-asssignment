import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    role: null,
  });
  const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
  const token = localStorage.getItem('accessToken')
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${baseURL}/api/auth/login`, { email, password },{headers: {
        Authorization: `Bearer ${token}`,
      }});
      localStorage.setItem("accessToken",data.accessToken)
      setAuthState({
        isAuthenticated: true,
        user: data.user,
        token: data.accessToken,
        role: data.role,
      });
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null, token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
