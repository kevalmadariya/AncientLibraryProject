// src/components/ErrorPopup.js
import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onClose }) => {
  console.log("ErrorMessage function called 1");
  if (!message) return null;
  console.log("ErrorMessage function called");
  return (
    <div className="error-popup-overlay">
      <div className="error-popup">
        <p>{message}</p>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default ErrorMessage;
