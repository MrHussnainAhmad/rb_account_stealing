// src/components/DrawSuccess.jsx
import React, { useEffect, useState } from "react";
import "../styles/DrawSuccess.css";

const DrawSuccess = ({ totalPlayers: propTotalPlayers }) => {
  console.log('🎯 DrawSuccess component is rendering!');
  console.log('📊 Prop totalPlayers:', propTotalPlayers);
  
  const [totalPlayers, setTotalPlayers] = useState(() => {
    // Initialize with calculated value to prevent loading glitch
    const min = 15000;
    const max = 20000;
    const lastStored = parseInt(localStorage.getItem("last_total_players")) || min;
    
    // Generate a random number greater than lastStored, with fallback
    let next;
    if (lastStored >= max) {
      // If we've reached max, start fresh with a random number
      next = Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      // Generate a number between lastStored+1 and max
      const newMin = Math.min(lastStored + 1, max);
      next = Math.floor(Math.random() * (max - newMin + 1)) + newMin;
    }
    
    return next;
  });

  useEffect(() => {
    // Store the initial value in localStorage
    localStorage.setItem("last_total_players", totalPlayers);
  }, [totalPlayers]);

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
