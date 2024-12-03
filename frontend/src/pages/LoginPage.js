import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="container mt-5">
      <div className="row align-items-center shadow p-4 rounded">
        {/* Left Side Image */}
        <div className="col-md-6 text-center">
          <img
            src="https://benakagoldcompany.com/logo/benakaLogo.webp"
            alt="Login Illustration"
            className="img-fluid rounded"
          />
        </div>

        {/* Right Side Form */}
        <div className="col-md-4">
          <h1 className="mb-4 text-center">Login</h1>
          <LoginForm />
          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <a href="/register" className="text-primary">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
