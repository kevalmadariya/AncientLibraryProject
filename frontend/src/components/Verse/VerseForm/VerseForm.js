import React, { useState, useEffect } from 'react';
import '../Verse.css';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const VerseForm = ({ verse, onSave, onCancel, editingVerse }) => {
    const [searchParams] = useSearchParams();
    const chapter_id = searchParams.get('chapter_id');
    console.log(editingVerse);
    console.log(verse);
    const verse_id = verse?._id;
    const [formData, setFormData] = useState({
        // iid: verse?._id || '',
        chapter_id: '',
        verse_no: '',
        sanskrit_script: '',
        hindi_translation: '',
        english_translation: '',
        interpretation: '',
        audio: null,
        video: '',
        who_tell: '',
        whome_to_tell: ''
    });

    useEffect(() => {
        if (verse) {
            setFormData(verse);
        }
    }, [verse]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSave(formData);
        if (editingVerse) {
            console.log("fjadhfksdjfjkfjkdjf jkdfjkda fjdhfjdh fjhakljfh dfuhefajdjc sdjafjsd");
            if (formData.audio) {
                const res = await axios.put('http://localhost:5000/verse/' + verse_id, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(res);
            } else {
                const res = await axios.put('http://localhost:5000/verse/' + verse_id, formData);
                console.log(res);
            }
            editingVerse = false;
        } else {
            const res = await axios.post('http://localhost:5000/verse/' + chapter_id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res);
        }
        editingVerse = false;
        // console.log(res);

    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                audio: file,
            }));
        }
    };


    return (
        <div className="verse-form-overlay">
            <div className="verse-manuscript-form">
                <h2 className="form-title">
                    {verse ? 'Edit Verse' : 'Add New Verse'}
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* <div className="form-group">
                        <label className="form-label">Chapter ID *</label>
                        <input
                            type="number"
                            className="form-input"
                            value={formData.chapter_id}
                            onChange={(e) => handleChange('chapter_id', parseInt(e.target.value) || '')}
                            required
                        />
                    </div> */}

                    <div className="form-group">
                        <label className="form-label">Verse Number *</label>
                        <input
                            type="number"
                            className="form-input"
                            value={formData.verse_no}
                            onChange={(e) => handleChange('verse_no', parseInt(e.target.value) || '')}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Sanskrit Script *</label>
                        <textarea
                            className="form-textarea"
                            value={formData.sanskrit_script}
                            onChange={(e) => handleChange('sanskrit_script', e.target.value)}
                            placeholder="Enter Sanskrit text..."
                            required
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Hindi Translation </label>
                        <textarea
                            className="form-textarea"
                            value={formData.hindi_translation}
                            onChange={(e) => handleChange('hindi_translation', e.target.value)}
                            placeholder="Enter Hindi translation..."
                            // required
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">English Translation </label>
                        <textarea
                            className="form-textarea"
                            value={formData.english_translation}
                            onChange={(e) => handleChange('english_translation', e.target.value)}
                            placeholder="Enter English translation..."
                            // required
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Interpretation </label>
                        <textarea
                            className="form-textarea"
                            value={formData.interpretation}
                            onChange={(e) => handleChange('interpretation', e.target.value)}
                            placeholder="Enter interpretation/commentary..."
                            // required
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Upload Audio</label>
                        <input
                            type="file"
                            className="form-input"
                            accept="audio/mp3,audio/wav,audio/m4a"
                            onChange={(e) => handleFileChange(e)}
                        />
                    </div>


                    <div className="form-group">
                        <label className="form-label">Video Link (YouTube)</label>
                        <input
                            type="url"
                            className="form-input"
                            value={formData.video}
                            onChange={(e) => handleChange('video', e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=your-video-id"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Who Tells </label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.who_tell}
                            onChange={(e) => handleChange('who_tell', e.target.value)}
                            placeholder="Speaker name..."
                        // required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">To Whom </label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.whome_to_tell}
                            onChange={(e) => handleChange('whome_to_tell', e.target.value)}
                            placeholder="Listener name..."
                        // required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="form-save-btn" >
                            {verse ? 'Update Verse' : 'Save Verse'}
                        </button>
                        <button type="button" className="form-cancel-btn" onClick={onCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerseForm;