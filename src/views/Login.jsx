import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import { ADMIN, ADMIN_EMAIL, ROLE, USER } from "../constants";
import "../styles/login.css";
import { loginUser } from "../utils/auth-axios-utils";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showForgotPasswordModal, setshowForgotPasswordModal] = useState(false);

  const handleForgotPasswordModalOpen = () => {
    setshowForgotPasswordModal(true);
  };

  const handleForgotPasswrodModalClose = () => {
    setshowForgotPasswordModal(false);
  };

  const navigate = useNavigate();

  const navigateProfile = () => {
    navigate("/profile");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginDetails = {
      Email: email,
      Password: password,
    };

    const response = loginUser(loginDetails);

    response.then((result) => {
      if (result.success) {
        handleLogin();
        if (email === ADMIN_EMAIL) {
          sessionStorage.setItem(ROLE, ADMIN);
        } else {
          sessionStorage.setItem(ROLE, USER);
        }
        navigateProfile();
      } else {
        setErrorMessage(result.error);
      }
    });
  };

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
      </form>
      <a
        href="#"
        onClick={handleForgotPasswordModalOpen}
        style={{
          textDecoration: "underline",
          color: "blue",
          cursor: "pointer",
        }}
      >
        Forgot the password?
      </a>
      <ForgotPasswordModal
        show={showForgotPasswordModal}
        handleClose={handleForgotPasswrodModalClose}
      />
    </main>
  );
};

export default Login;
