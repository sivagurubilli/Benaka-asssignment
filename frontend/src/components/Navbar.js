import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Image } from "react-bootstrap";

const Navbar = () => {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Image style={{width:"60px",height:"60px"}} src="https://benakagoldcompany.com/logo/benakaLogo.webp" />
        <Link className="navbar-brand ml-5" to="/">
          Benaka gold company
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {authState.isAuthenticated ? (
              <>
                {authState.role === "admin" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      Admin Dashboard
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/user">
                    User Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
