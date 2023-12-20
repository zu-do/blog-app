import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { ADMIN, ROLE, TOKEN, WRITE_PERM } from "./constants";
import { removePermissions } from "./utils/auth-utils";
import AddArticle from "./views/AddArticle";
import Admin from "./views/Admin";
import ArticleDetail from "./views/ArticleDetail";
import Login from "./views/Login";
import Main from "./views/Main";
import Register from "./views/Register";
import RestorePassword from "./views/RestorePassword";
import UserProfile from "./views/UserProfile";
import AdminReports from "./views/AdminReports";

function App() {
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN);

    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);

  const handleLogin = () => {
    setLogged(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(ROLE);
    removePermissions();
    setLogged(false);
  };

  return (
    <>
      <Navbar isLogged={isLogged} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Main />} />
        {!isLogged && (
          <>
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
          </>
        )}
        {isLogged && <Route path="/profile" element={<UserProfile />} />}
        {isLogged && sessionStorage.getItem(WRITE_PERM) === "true" && (
          <Route path="/addArticle" element={<AddArticle />} />
        )}
        {isLogged && sessionStorage.getItem(ROLE) === ADMIN && (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/reports" element={<AdminReports />} />
          </>
        )}
        <Route path="/articles/:articleId" element={<ArticleDetail />} />
        <Route path="/api/Auth/RestorePassword" element={<RestorePassword />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
