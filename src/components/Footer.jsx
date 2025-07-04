// src/components/Footer.jsx
import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#">About Us</a>
        <a href="#">Jobs</a>
        <a href="#">Blog</a>
        <a href="#">Parents</a>
        <a href="#">Gift Cards</a>
        <a href="#">Help</a>
        <a href="#">Terms</a>
        <a href="#">Accessibility</a>
        <a href="#">Privacy</a>
        <a href="#">Your Privacy Choices</a>
      </div>
      <div className="footer-copy">
        ©2025 Roblox Corporation. Roblox, the Roblox logo and Powering
        Imagination are among our registered and unregistered trademarks in the
        U.S. and other countries.
      </div>
    </footer>
  );
};

export default Footer;
