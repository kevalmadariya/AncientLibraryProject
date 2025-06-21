import React, { useState } from 'react';
import VerseItem from '../VerseItem/VerseItem';
import '../Verse.css';
import { Plus } from 'lucide-react';
import axios from 'axios';
import AncientLoader from '../../../Core/Loader/AncientLoader';

const VerseList = ({ onAddVerse, chapter_id, verses, onEditVerse, onDeleteVerse, onAddComment }) => {
    const [expandedVerses, setExpandedVerses] = useState(new Set());
    const [wantstoupload, setWantstoupload] = useState(false);
    const [Loading, setLoading] = useState(false);

    const toggleVerse = (verseId) => {
        const newExpanded = new Set(expandedVerses);
        if (newExpanded.has(verseId)) {
            newExpanded.delete(verseId);
        } else {
            newExpanded.add(verseId);
        }
        setExpandedVerses(newExpanded);
    };

    const handleAddUploadForm = () => {
        if (wantstoupload) {
            setWantstoupload(false);
        } else {
            setWantstoupload(true);
        }
    }

    const saveVerces = async (e) => {
        e.preventDefault();

        const fileInput = document.getElementById('file');
        const file = fileInput.files[0];

        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);
        axios.post('http://localhost:5000/verse/file/' + chapter_id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            console.log(response);
            setWantstoupload(false);
            onAddVerse();
            // window.location.reload();
        }).catch(
            error => {
                console.log("Error while uploding file:" + error);
            }
        ).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className="verses-scroll-area">

            <button className="ancient-btn" onClick={handleAddUploadForm}>
                <Plus size={24} /> Import Verse
            </button>

            {Loading && <AncientLoader />}

            {wantstoupload && (
                <div className="upload-container">
                    <form className="ancient-form">
                        <label htmlFor="file">Upload file (.json or .csv):</label><br />
                        <input type="file" id="file" name="file" accept=".json,.csv" /><br />
                        <button type="submit" className="ancient-btn" onClick={saveVerces}>Add</button>
                    </form>
                    <p className="field-guidance">
                        <strong>Make sure field names match:</strong><br />
                        {/* <ul> */}
                        <li><b>Verse*</b>: <code>sanskrit_script</code></li>
                        <li><b>Verse Number*</b>: <code>verse_no</code></li>
                        <li><b>English Translation</b>: <code>english_translation</code></li>
                        <li><b>Hindi Translation</b>: <code>hindi_translation</code></li>
                        <li><b>Teller</b>: <code>who_tell</code></li>
                        <li><b>Listener</b>: <code>whome_to_tell</code></li>
                        <li><b>Deep Meaning</b>: <code>interpretation</code></li>
                        {/* </ul> */}
                    </p>
                </div>
            )}
            {verses.map((verse) => (
                <VerseItem
                    key={verse._id}
                    verse={verse}
                    isExpanded={expandedVerses.has(verse._id)}
                    onToggle={() => toggleVerse(verse._id)}
                    onEdit={() => onEditVerse(verse)}
                    onDelete={() => onDeleteVerse(verse._id)}
                    onAddComment={(commentText) => onAddComment(verse._id, commentText)}
                />
            ))}
        </div >
    );
};

export default VerseList;