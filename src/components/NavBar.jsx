// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaEye } from 'react-icons/fa';
import NYULogo from '../assets/nyu-logo.png'; // Ensure the correct path to the logo
import '../styles/NavBar.css'; // Import the NavBar styles

const NavBar = () => {
  return (
    <nav className="nav-container">
      <div className="nav-logo-title">
        <img src={NYULogo} alt="NYU Logo" className="nav-logo" />
        <span className="nav-title">Digital Forms</span>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          <FaPencilAlt className="nav-icon" />
          <span>Form Creator</span>
        </Link>
        <Link to="/view" className="nav-link">
          <FaEye className="nav-icon" />
          <span>Form Viewer</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;