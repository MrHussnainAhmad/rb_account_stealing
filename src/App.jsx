// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import DrawSuccess from "./components/DrawSuccess";

function App() {
  console.log('🔄 App component rendering...');
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/draw-success" element={<DrawSuccess totalPlayers={100} />} />
        {/* Fallback route for debugging */}
        <Route path="*" element={
          <div style={{color: 'white', padding: '20px', backgroundColor: '#1c1c1c', minHeight: '50vh'}}>
            <h1>🔍 Route Debug Info</h1>
            <p>Current URL: {window.location.href}</p>
            <p>Current pathname: {window.location.pathname}</p>
            <p>Available routes: /, /login, /draw-success</p>
          </div>
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
