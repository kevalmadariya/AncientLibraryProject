import React from 'react';
import './Popup.css';

const AncientPopup = ({ onConfirm, onClose, message, button }) => {
    return (
        <div className="ancient-popup-overlay">
            <div className="ancient-popup">
                <button className="popup-close" onClick={onClose}>&times;</button>
                {/* <h2>🕉️ Ancient Wisdom</h2> */}
                <p>{message}</p>
                <button className="popup-action" onClick={onConfirm}> {button} </button>
            </div>
        </div>
    );
};

export default AncientPopup;
