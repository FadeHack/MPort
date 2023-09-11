import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/StartPage.css';

const StartPage = () => {
  return (
    <div className="start-page-container">
    <div className="background-image" > </div>
      <div className="start-page-box">
        <h2 className="start-page-title">Welcome to MPort</h2>
        <p className="start-page-description">
          This is an awesome application that connects Manufacturers and Transporters.
          Register now and start managing your orders efficiently!
        </p>
        <div className="start-page-buttons">
          <Link to="/login" className="start-page-button">Login</Link>
          <Link to="/register" className="start-page-button">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
