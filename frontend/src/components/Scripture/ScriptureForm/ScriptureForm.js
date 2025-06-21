import React, { useState, useContext, useEffect } from 'react';
import './ScriptureForm.css';
import { FaBook, FaFeatherAlt, FaScroll } from 'react-icons/fa';
import { UserContext } from '../../Auth/Context/UserContext';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ScriptureForm = () => {

    // const { user } = useContext(UserContext);
    // console.log(user);
    const userid = localStorage.getItem('userId');
    console.log(userid);

    const [searchParams] = useSearchParams();
    const scripture_id = searchParams.get('scripture_id');
   
    console.log(scripture_id);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        author: '',
        language: '',
        no_of_chapters: '',
        no_of_verse: '',
        description: ''
    });


    const initScripture = async () => {
        if (scripture_id) {
            const scripture = await axios.get(`http://localhost:5000/scripture/scripture/${scripture_id}`);
            console.log(scripture.data);
            setFormData({
                name: scripture.data.name,
                author: scripture.data.author,
                language: scripture.data.language,
                no_of_chapters: scripture.data.no_of_chapters,
                no_of_verse: scripture.data.no_of_verse,
                description: scripture.data.description
            });

        }
    }

    useEffect(() => {
        initScripture();
    }, []);
    // initScripture();

    const [errors, setErrors] = useState({
        name: false,
        author: false,
        language: false,
        no_of_chapters: false,
        no_of_verse: false
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {
            name: !formData.name,
            author: !formData.author,
            language: !formData.language,
            no_of_chapters: !formData.no_of_chapters,
            no_of_verse: !formData.no_of_verse
        };

        setErrors(newErrors);

        if (!Object.values(newErrors).some(error => error) && !scripture_id) {
            // alert('Scripture saved to the ancient archives!');
            console.log('Form data:', formData);
            const scripture = axios.post('http://localhost:5000/scripture/' + userid,
                formData
            );
            console.log(scripture);
            navigate('/scripture');
        } else {
            console.log('Form data:', formData);
            const scripture = axios.put('http://localhost:5000/scripture/' + scripture_id,
                formData
            );
            console.log(scripture);
            navigate('/scripture');
        }
    };

    const handleAddButton = () => {
        navigate(`/chapter?scripture_id=${scripture_id}`);
    }

    return (
        <div className="ancient-scripture-form">
            <div className="parchment-scroll">
                <div className="scroll-top-decoration">
                    <FaScroll className="scroll-icon" />
                </div>

                <div className="ancient-header">
                    <h1><FaBook /> Inscribe New Scripture</h1>
                    <p className="illuminated-text">Record sacred knowledge for posterity</p>
                    <div className="divider-line"></div>
                </div>

                <form onSubmit={handleSubmit} className="ancient-form">
                    <div className={`form-group ${errors.name ? 'invalid' : ''}`}>
                        <label className="quill-label">
                            <FaFeatherAlt /> Scripture Name <span className="required-symbol">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="ancient-input"
                            placeholder="e.g. Bhagavad Gita"
                        />
                        {errors.name && <span className="ancient-error">This field must be inscribed</span>}
                    </div>

                    <div className={`form-group ${errors.author ? 'invalid' : ''}`}>
                        <label className="quill-label">
                            <FaFeatherAlt /> Author/Sage <span className="required-symbol">*</span>
                        </label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="ancient-input"
                            placeholder="e.g. Maharishi Vyasa"
                        />
                        {errors.author && <span className="ancient-error">The sage's name is required</span>}
                    </div>

                    <div className={`form-group ${errors.language ? 'invalid' : ''}`}>
                        <label className="quill-label">
                            <FaFeatherAlt /> Language <span className="required-symbol">*</span>
                        </label>
                        <select
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className="ancient-select"
                        >
                            <option value="">-- Select Divine Language --</option>
                            <option value="sanskrit">Sanskrit (दिव्य भाषा)</option>
                            <option value="hindi">Hindi (हिन्दी)</option>
                            <option value="english">English</option>
                            <option value="other">Multiple Language</option>
                        </select>
                        {errors.language && <span className="ancient-error">Choose the language of revelation</span>}
                    </div>

                    <div className="ancient-columns">
                        <div className={`form-group ${errors.no_of_chapters ? 'invalid' : ''}`}>
                            <label className="quill-label">
                                <FaFeatherAlt /> Chapters <span className="required-symbol">*</span>
                            </label>
                            <input
                                type="number"
                                name="no_of_chapters"
                                value={formData.no_of_chapters}
                                onChange={handleChange}
                                className="ancient-input"
                                placeholder="e.g. 18"
                                min="1"
                            />
                            {errors.no_of_chapters && <span className="ancient-error">How many chapters?</span>}
                        </div>

                        <div className={`form-group ${errors.no_of_verse ? 'invalid' : ''}`}>
                            <label className="quill-label">
                                <FaFeatherAlt /> Verses <span className="required-symbol">*</span>
                            </label>
                            <input
                                type="number"
                                name="no_of_verse"
                                value={formData.no_of_verse}
                                onChange={handleChange}
                                className="ancient-input"
                                placeholder="e.g. 700"
                                min="1"
                            />
                            {errors.no_of_verse && <span className="ancient-error">How many sacred verses?</span>}
                        </div>
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
                            placeholder="Describe the divine wisdom contained within..."
                            rows="5"
                        ></textarea>
                    </div>

                    <button type="submit" className="scribe-button">
                        <FaFeatherAlt /> Inscribe Scripture
                    </button>


                </form>
                <button
                    className="scribe-button"
                    onClick={handleAddButton}
                    style={{
                        // display: 'block',
                        width: '100%',
                        margin: '0 auto',
                        textAlign: 'center'
                    }}
                >
                    <FaFeatherAlt /> Add Chapter
                </button>

                <div className="scroll-bottom-decoration">
                    <div className="ancient-seal">Seal of Wisdom</div>
                </div>
            </div>
        </div>
    );
};

export default ScriptureForm;