import { Link } from "react-router-dom";
import "../styles/header.css";

function Header({ isLoggedIn, onLogout }) {
  return (
    <header className="header">
      <h1>Task Manager</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        {isLoggedIn ? (
          <Link to="/dashboard" onClick={onLogout} className="logout-btn">
            Logout
          </Link>
        ) : (
          <>
            <Link to="/">Login</Link>
            <Link to="/register" className="register-btn">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
