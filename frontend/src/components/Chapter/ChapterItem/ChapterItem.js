import React, { useEffect, useRef, useState } from 'react';
import '../Chapter.css';
import {
    FaChevronDown,
    FaChevronRight,
    FaEdit,
    FaTrash,
    FaPlus,
    FaScroll,
    FaFeatherAlt,
    FaSave,
    FaTimes
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ChapterItem = ({ chapter, onEdit, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const navigate = useNavigate();

    const handleverse = () => {
        navigate('/verse?chapter_id=' + chapter.id);
    }
    return (
        <div className="ancient-chapter-scroll">
            <div
                className="chapter-header-parchment"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="chapter-header-content">
                    <div className="chapter-title-section">
                        {isExpanded ? <FaChevronDown className="expand-icon" /> : <FaChevronRight className="expand-icon" />}
                        <span className="chapter-number">Chapter {chapter.chapter_no}</span>
                        <span className="chapter-name">{chapter.name}</span>
                    </div>
                    <FaScroll className="scroll-icon" />
                </div>
            </div>

            {isExpanded && (
                <div className="chapter-content-manuscript">
                    <div className="chapter-details">
                        <div className="detail-row">
                            <span className="detail-label">Chapter:</span>
                            <span className="detail-value">{chapter.chapter_no}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Name:</span>
                            <span className="detail-value">{chapter.name}</span>
                        </div>
                        <div className="detail-row description-row">
                            <span className="detail-label">Description:</span>
                            <span className="detail-value description-text">
                                {chapter.description || "No description inscribed yet..."}
                            </span>
                        </div>
                    </div>

                    <div className="chapter-actions">
                        <button onClick={handleverse} className="ancient-edit-btn">
                            <FaPlus /> Verse
                        </button>
                        <button onClick={() => onEdit(chapter)} className="ancient-edit-btn">
                            <FaEdit /> Edit
                        </button>
                        <button onClick={() => onDelete(chapter.id)} className="ancient-delete-btn">
                            <FaTrash /> Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChapterItem;