import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import RegisterPage from "./pages/RegisterPage";
import UpdateProfileForm from "./pages/UpdateProfile";
import AddUserForm from "./pages/AddUser";

const App = () => {
  const { authState } = useContext(AuthContext);

  const ProtectedRoute = ({ children, role }) => {
    if (!authState.isAuthenticated) return <Navigate to="/login" />;
    if (role && authState.role !== role) return <Navigate to="/" />;
    return children;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />

<Route
          path="/add-user"
          element={
            <ProtectedRoute role="admin">
              <AddUserForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserPage />
            </ProtectedRoute>
          }
        />

<Route
  path="/update-profile/:id"
  element={
    <ProtectedRoute role="user">
      <UpdateProfileForm />
    </ProtectedRoute>
  }
/>
      </Routes>
    </Router>
  );
};

export default App;
