import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { registerUser } from "../utils/auth-axios-utils";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      UserName: username,
      Email: email,
      Password: password,
    };
    const response = registerUser(user);
    response.then((result) => {
      if (result.success) {
        navigateLogin();
      } else {
        setErrorMessage(result.error);
      }
    });
  };

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please register</h1>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="form-floating">
          <input
            className="form-control"
            id="floatingInput"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
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
          Register
        </button>
      </form>
    </main>
  );
};

export default Register;
