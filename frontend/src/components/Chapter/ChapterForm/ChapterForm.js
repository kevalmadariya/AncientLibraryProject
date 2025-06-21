import React, { useEffect, useRef, useState } from 'react';
import '../Chapter.css';
import {
    FaFeatherAlt,
    FaSave,
    FaTimes
} from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

const ChapterForm = ({ onSave, onCancel, initialData = null }) => {

    const [searchParams] = useSearchParams();
    const scripture_id = searchParams.get('scripture_id');

    const [formData, setFormData] = useState({
        chapter_no: initialData?.chapter_no || '',
        name: initialData?.name || '',
        description: initialData?.description || ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: false
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {
            chapter_no: !formData.chapter_no,
            name: !formData.name
        };

        setErrors(newErrors);
        onSave(formData);
        // if (!Object.values(newErrors).some(error => error)) {
        //     const res = await axios.post(`http://localhost:5000/chapter/${scripture_id}`, formData);
        //     console.log(res);
        //     onSave(formData);
        // }
    };

    return (
        <div className="chapter-manuscript-form">
            <div className="form-illuminated-border">
                <form onSubmit={handleSubmit} className="ancient-chapter-form">
                    <div className={`form-group ${errors.chapter_no ? 'invalid' : ''}`}>
                        <label className="quill-label">
                            <FaFeatherAlt /> Chapter Number <span className="required-symbol">*</span>
                        </label>
                        <input
                            type="number"
                            name="chapter_no"
                            value={formData.chapter_no}
                            onChange={handleChange}
                            className="ancient-input"
                            placeholder="e.g. 1"
                            min="1"
                        />
                        {errors.chapter_no && <span className="ancient-error">Chapter number is required</span>}
                    </div>

                    <div className={`form-group ${errors.name ? 'invalid' : ''}`}>
                        <label className="quill-label">
                            <FaFeatherAlt /> Chapter Name <span className="required-symbol">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="ancient-input"
                            placeholder="e.g. The Sacred Teachings"
                        />
                        {errors.name && <span className="ancient-error">Chapter name is required</span>}
                    </div>

                    <div className="form-group">
                        <label className="quill-label">
                            <FaFeatherAlt /> Sacred Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="ancient-textarea"
                            placeholder="Describe the divine wisdom of this chapter..."
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="scribe-save-btn">
                            <FaSave /> Inscribe Chapter
                        </button>
                        <button type="button" onClick={onCancel} className="scribe-cancel-btn">
                            <FaTimes /> Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChapterForm;