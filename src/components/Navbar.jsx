import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN, ROLE, TOKEN } from "../constants";
import logo from "../logo.svg";
import { getUser } from "../utils/auth-axios-utils";
import { checkToken, removePermissions } from "../utils/auth-utils";

const Navbar = ({ isLogged, handleLogout }) => {
  const navigate = useNavigate();

  const navigateMain = () => {
    navigate("/");
  };

  const navigateAdmin = () => {
    navigate("/admin");
  };
  const navigateReports = () => {
    navigate("/reports");
  };

  useEffect(() => {
    isLogged = checkToken();
    getUser().then((data) => {
      if (data === null) {
        removePermissions();
      }
    });
  });

  const handleClick = (e) => {
    e.preventDefault();
    sessionStorage.removeItem(TOKEN);
    handleLogout();
    navigateMain();
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <img
          src={logo}
          alt="Logo"
          style={{ width: "40px", height: "auto" }}
          onClick={navigateMain}
        />
        <a
          className="navbar-brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigateMain();
          }}
        >
          THE BLOG
        </a>
        {sessionStorage.getItem(ROLE) === ADMIN && (
          <>
            <a
              className="navbar-brand"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigateAdmin();
              }}
            >
              PERMISSIONS
            </a>
            <a
              className="navbar-brand"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigateReports();
              }}
            >
              REPORTS
            </a>
          </>
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          {isLogged ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/profile"
                >
                  My profile
                </a>
                <a
                  className="nav-link active"
                  aria-current="page"
                  onClick={handleClick}
                  style={{ cursor: "pointer" }}
                >
                  LOG OUT
                </a>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/login"
                >
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
