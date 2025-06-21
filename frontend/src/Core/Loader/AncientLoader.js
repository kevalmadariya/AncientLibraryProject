import React from 'react';
import './AncientLoader.css';
import { FaScroll } from 'react-icons/fa';

const AncientLoader = () => {
    return (
        <div className="ancient-loader-wrapper">
            <div className="ancient-scroll-spinner">
                <FaScroll className="scroll-icon" size={55} />
            </div>
            <p className="ancient-loading-text">Transcribing Sacred Knowledge...</p>
        </div>
    );
};

export default AncientLoader;
