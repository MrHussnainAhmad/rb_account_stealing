// src/components/DrawSuccess.jsx
import React, { useEffect, useState } from "react";
import "../styles/DrawSuccess.css";

const DrawSuccess = () => {
  const [totalPlayers, setTotalPlayers] = useState(0);

  useEffect(() => {
    const min = 15000;
    const max = 20000;

    const lastStored = parseInt(localStorage.getItem("last_total_players")) || min;

    // Generate a random number greater than lastStored
    let next = lastStored;
    while (next <= lastStored) {
      next = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    setTotalPlayers(next);
    localStorage.setItem("last_total_players", next);
  }, []);

  const handleExit = () => {
    // Method 1: Try to close the current tab/window
    try {
      window.close();
    } catch (e) {
      console.log('Window close failed, trying alternative methods');
    }
    
    // Method 2: If window.close() fails, try alternative approaches
    setTimeout(() => {
      try {
        // Try to open a blank page and close
        window.open('', '_self');
        window.close();
      } catch (e) {
        // Method 3: Redirect to a blank page as last resort
        window.location.href = 'about:blank';
      }
    }, 100);
    
    // Method 4: Clear everything and show a message
    setTimeout(() => {
      document.body.innerHTML = `
        <div style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #000;
          color: #fff;
          font-family: Arial, sans-serif;
          text-align: center;
        ">
          <div>
            <h1>✅ Thank you!</h1>
            <p>You can now close this tab safely.</p>
            <p style="font-size: 14px; color: #888;">If the tab didn't close automatically, please close it manually.</p>
          </div>
        </div>
      `;
    }, 200);
  };

  return (
    <div className="draw-success-container">
      <div className="draw-box">
        <h1>🎉 You've Successfully Joined the Lucky Draw!</h1>
        <p>
          You are one of <strong>{totalPlayers}</strong> lucky users selected.
          <br />
          Please check your mail on <strong>16 July</strong>.
          <br />
          If you win, you will be able to <strong>claim your reward from the mail</strong> on that day.
        </p>
        <button className="exit-btn" onClick={handleExit}>I Agree!</button>
      </div>
    </div>
  );
};

export default DrawSuccess;
