import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import VerseList from '../VerseList/VerseList';
import VerseForm from '../VerseForm/VerseForm';
import '../Verse.css';
import { useSearchParams } from 'react-router-dom';
import { initialVerses } from '../InitalData/initalData';
import axios from 'axios';
import ErrorMessage from '../../../Core/Error/ErrorMessage';
import AncientPopup from '../../../Core/Popup/Popup';
import AncientLoader from '../../../Core/Loader/AncientLoader';

const AncientVersesComponent = () => {

    const [verses, setVerses] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingVerse, setEditingVerse] = useState(null);
    const [searchParams] = useSearchParams();
    const [isEditingVerse, setIsEditingVerse] = useState(false);
    const [isFetch, setIsFetch] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [deleteVerseId, setDeleteVerseId] = useState('');
    const chapter_id = searchParams.get('chapter_id');
    const user_id = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const [Loading, setLoading] = useState(false);
    const [chapter, setChapter] = useState(null);

    console.log(chapter_id);
    console.log("affadf");

    const fetchVerse = async () => {
        console.log("fetch start");
        setLoading(true);
        const res = await axios.get('http://localhost:5000/verse/' + chapter_id);
        setLoading(false);
        console.log(res);
        setVerses(res.data);
        console.log(verses);
    }

    const fetchChapter = async () => {
        const res = await axios.get('http://localhost:5000/chapter/chapter/' + chapter_id);
        console.log(res);
        setChapter(res.data[0]);
    }

    useEffect(() => {
        fetchVerse();
        fetchChapter();
        setIsFetch(false);
        console.log("Chapter ID:", chapter_id);
    }, [isFetch]);

    const handleAddVerse = () => {
        console.log(chapter_id);
        setShowAddForm(true);
        setEditingVerse(null);
    };

    const handleEditVerse = (verse) => {
        setEditingVerse(verse);
        setIsEditingVerse(true);
        setShowAddForm(true);
    };

    const handleDeleteVerse = (verseId) => {
        console.log(verseId);
        setDeleteVerseId(verseId);
        setIsDelete(true);
        console.log(isDelete);
    };

    const handleSaveVerse = (verseData) => {
        if (editingVerse) {
            setVerses(verses.map(v => v._id === editingVerse._id ? { ...verseData, _id: editingVerse._id, audio: editingVerse.audio } : v));
        } else {
            const newVerse = {
                ...verseData,
                // _id: Math.max(...verses.map(v => v._id), 0) + 1,
                // comments: []
                audio: verseData.audio
            };
            setVerses([...verses, newVerse]);
        }
        console.log(editingVerse);
        console.log(verseData);
        setIsFetch(true);
        setIsEditingVerse(false);
        setShowAddForm(false);
        setEditingVerse(null);

        console.log("ssssssssssssssssssss      handleSaveVerse              qqqqqqqqqqqqqqqqqq");
    };

    if (editingVerse) {
        console.log("...................edit./////////////////////////////////////");
    }

    const handleCancelForm = () => {
        setShowAddForm(false);
        setEditingVerse(null);
    };

    const handleAddComment = (verseId, commentText) => {
        function formatDateIST(date) {
            let day = String(date.getDate()).padStart(2, '0');
            let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            let year = date.getFullYear();

            let hours = date.getHours();
            let minutes = String(date.getMinutes()).padStart(2, '0');
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; // Convert 0 to 12-hour format

            return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
        }

        const now = new Date(); // Already local time
        const formattedDate = formatDateIST(now);

        console.log("Formatted:", formattedDate);

        console.log("Formatted:", formattedDate);
        const comment = {
            verse_id: verseId,
            user_id: user_id,
            user: username,
            comment: commentText,
            created_at: formattedDate
        };

        axios.post('http://localhost:5000/comment/' + verseId, comment)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log('Error while adding comment:', error);
            })
    };

    const conformDelete = () => {

        axios.delete('http://localhost:5000/verse/' + deleteVerseId)
            .then(response => {
                setVerses(verses.filter(v => v._id !== deleteVerseId));
                setIsDelete(false);
                console.log(response);
            }).catch(error => {
                console.log('Error deleting Scripture:', error);
            });

        console.log("d");
    }

    const handleClose = () => {
        setIsDelete(false);
    }

    const handleChangeFetch = () => {
        if(isFetch){
            setIsFetch(false);
        }else{
            setIsFetch(true);
        }
    }

    return (
        <div className="ancient-verses-container">
            <div className="verses-manuscript">
                <div className="manuscript-header">
                    <h1 className="verses-title">
                        📜 {chapter?.name} - {chapter?.chapter_no}
                    </h1>
                    <div className="illuminated-divider"></div>
                </div>
                {console.log(verses)}
                {console.log(chapter)}
                <VerseList
                    onAddVerse={handleChangeFetch}
                    chapter_id={chapter_id}
                    verses={verses}
                    onEditVerse={handleEditVerse}
                    onDeleteVerse={handleDeleteVerse}
                    onAddComment={handleAddComment}
                />
                {Loading && <AncientLoader />}

            </div>

            {showAddForm && (
                <VerseForm
                    verse={editingVerse}
                    onSave={handleSaveVerse}
                    onCancel={handleCancelForm}
                    editingVerse={isEditingVerse}
                />
            )}



            <button
                className="add-verse-fixed-btn"
                onClick={handleAddVerse}
                title="Add New Verse"
            >
                <Plus size={24} />
            </button>

            {isDelete && (
                <AncientPopup
                    onConfirm={conformDelete}
                    onClose={handleClose}
                    message="Are you sure you want to delete this verse?"
                    button="Delete Verse"
                />
            )
            }

        </div>
    );
};

export default AncientVersesComponent;