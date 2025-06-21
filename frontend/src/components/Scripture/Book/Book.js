import React, { useState } from 'react';
import './Book.css';
import { FaUser, FaScroll, FaBookOpen } from 'react-icons/fa';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AncientPopup from '../../../Core/Popup/Popup';

const Book = ({ scripture, onDeleteSuccess }) => {

    const navigate = useNavigate();
    const [isDelete, setIsDelete] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [scriptureIdToDelete, setScriptureIdToDelete] = useState(null);
    const onEdit = (scripture_id) => {
        navigate(`/ScriptureForm?scripture_id=${scripture_id}`);
    }

    const onDelete = async (scripture_id) => {
        setScriptureIdToDelete(scripture_id);
        console.log(isDelete);
        console.log("ShowPopup" + showPopup);
        setIsDelete(true);
        setShowPopup(true); // Show popup
    }

    const confirmDelete = async () => {
        console.log("delete start");
        console.log(scriptureIdToDelete);
        console.log(isDelete);
        if (!scriptureIdToDelete || !isDelete) return;
        setIsDelete(true);
        console.log("delete start 2");
        // console.log()
        try {
            const res = await axios.delete(`http://localhost:5000/scripture/${scriptureIdToDelete}`);
            if (res.status === 200) {
                console.log('Scripture deleted successfully');
                setShowPopup(false);
                onDeleteSuccess?.(); // Notify parent if provided
                navigate('/scripture');
            }
        } catch (err) {
            console.error('Error deleting scripture:', err);
        } finally {
            setIsDelete(false);
        }
    }

    const navigatetoChapter = () => {
        navigate(`/chapter?scripture_id=${scripture._id}`);
    }
    return (
        <>

            <div className="ancient-scripture-book" data-id={scripture.id}>
                <div className="parchment-cover">
                    <div className="scroll-binding"></div>
                    <div className="ancient-cover-front">
                        <div className="illuminated-border">
                            <div className="manuscript-title">
                                {scripture.name.split(' ').map((line, index) => (
                                    <span key={index} className="title-line">{line}</span>
                                ))}
                            </div>
                            <div className="golden-ornament">
                                <FaScroll className="scroll-decoration" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="manuscript-details">
                    <div className="parchment-content">
                        <p className="sacred-description">{scripture.description}</p>

                        <div className="scribe-info">
                            <p><FaUser className="ancient-icon" /> <span className="info-label">Sage:</span> {scripture.author}</p>
                            {/* <p><FaLanguage className="ancient-icon" /> <span className="info-label">Divine Language:</span> {scripture.languages}</p> */}
                            {/* <p><FaCalendarAlt className="ancient-icon" /> <span className="info-label">Era:</span> {scripture.composed}</p> */}
                        </div>

                        <div className="sacred-metrics">
                            <div className="metric-scroll">
                                <strong>{scripture.no_of_chapters}</strong>
                                <span className="metric-label">{scripture.chapter_type}</span>
                            </div>
                            <div className="metric-scroll">
                                <strong>{scripture.no_of_verse}</strong>
                                <span className="metric-label">{scripture.type === 'Principal' ? 'Total' : 'Verses'}</span>
                            </div>
                        </div>

                        {/* <button
                            className="ancient-read-btn"
                        // onClick={() => onRead(scripture.name)}
                        >
                            <FaBookOpen className="read-icon" />
                            <span>Study Sacred Text</span>
                        </button> */}

                        <div className="action-buttons">
                            <button
                                className="ancient-read-btn edit-btn"
                                onClick={navigatetoChapter}
                            >
                                <FaBookOpen className="read-icon" />
                                <span>Study Sacred Text</span>
                            </button>
                            <button
                                className="ancient-read-btn edit-btn"
                                onClick={() => onEdit(scripture._id)}
                            >
                                <FaEdit className="read-icon" />
                                <span>Edit</span>
                            </button>

                            <button
                                className="ancient-read-btn delete-btn"
                                onClick={() => onDelete(scripture._id)}
                            >
                                <FaTrash className="read-icon" />
                                <span>Delete</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {showPopup && (
                <AncientPopup
                    onConfirm={confirmDelete}
                    onClose={() => setShowPopup(false)}
                    message={"Are you sure you wish to delete this sacred scripture?"}
                    button={"Delete"}
                />
            )};
        </>
    );
};

export default Book;