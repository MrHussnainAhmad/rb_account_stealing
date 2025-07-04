import React from "react";
import "../styles/Navbar.css";
import robloxIcon from "../assets/logo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user is on DrawSuccess page
  const isOnDrawSuccessPage = location.pathname === '/draw-success';
  
  const handleLogout = () => {
    // Clear any stored data and redirect to home
    localStorage.removeItem('roblox_login_data');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img
          src={robloxIcon}
          alt="Roblox Logo"
          className="logo"
          id="logo"
          onClick={() => navigate("/")} // 👈 navigate to homepage
        />
        <a href="#">Charts</a>
        <a href="#">Marketplace</a>
        <a href="#">Create</a>
        <a href="#">Robux</a>
        <div className="search-wrapper">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="nav-right">
        {isOnDrawSuccessPage ? (
          <button className="signup-btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="signup-btn" onClick={() => navigate("/login")}>
            Sign Up
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
