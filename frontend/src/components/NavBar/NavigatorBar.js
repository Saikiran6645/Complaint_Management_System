import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavigatorBar.css";

const NavigationBar = () => {
  const navigate = useNavigate();

  // Retrieve user information from localStorage and parse it
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    // Clear user authentication token and redirect to login page
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Complaint Management</h2>
      </div>
      <ul className="navbar-links">
        {/* Conditionally render links based on the user's role */}
        {userInfo?.role === "user" && (
          <>
            <li>
              <Link to="/">Raise Complaint</Link>
            </li>
            <li>
              <Link to="/userComplaints">View Complaints</Link>
            </li>
          </>
        )}
        <li>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
