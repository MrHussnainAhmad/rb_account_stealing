// src/components/HomePage.jsx
import React from "react";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="overlay">
        <div className="announcement-box">
          <h1 className="hero-heading">🎉 Roblox Anniversary Event 🎉</h1>
          <p className="hero-subtext">
            Be one of the <strong>first 100 users</strong> to claim <span className="robux">5000 Robux</span>!
          </p>
          <button className="claim-btn" onClick={() => navigate("/login")}>
            Claim Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
