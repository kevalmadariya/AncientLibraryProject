import React, { useEffect, useRef, useState } from 'react';
import '../Chapter.css';
import axios from 'axios';
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
import { useSearchParams } from 'react-router-dom';
import AncientPopup from '../../../Core/Popup/Popup';
import ChapterForm from '../ChapterForm/ChapterForm';
import ChapterItem from '../ChapterItem/ChapterItem';

const Chapter = ({ selectedBook }) => {
    const [searchParams] = useSearchParams();
    const scripture_id = searchParams.get('scripture_id');

    // const [chapters, setChapters] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [isPopup, setIsPopup] = useState(false);
    const [deleteChapterId, setDeleteChapterId] = useState("");

    const [isAddingChapter, setIsAddingChapter] = useState(false);
    const [editingChapter, setEditingChapter] = useState(null);


    const fetchChapters = () => {
        axios.get(`http://localhost:5000/chapter/${scripture_id}`)
            .then(response => {
                // Assuming response.data is an array like:
                // [{ chapter_no: 1, name: 'Intro', description: '...' }, {...}]
                const filteredChapters = response.data.map(chapter => ({
                    id: chapter._id,
                    chapter_no: chapter.chapter_no,
                    name: chapter.name,
                    description: chapter.description
                }));

                setChapters(filteredChapters);
                console.log('Fetched chapters:', response.data);
                console.log(chapters);

            })
            .catch(error => {
                console.error('Error fetching chapters:', error);
            });
    };

    useEffect(() => {
        fetchChapters();
    }, []); // Optional: refetch when scripture_id changes


    const handleAddChapter = async (formData) => {
        setIsAddingChapter(false);
        const res = await axios.post(`http://localhost:5000/chapter/${scripture_id}`, formData);
        console.log(res);
        const newChapter = {
            id: res.data._id,
            ...formData
        };
        setChapters(prev => [...prev, newChapter]);
    };

    const handleEditChapter = (formData) => {
        const ChapterData = {
            id: editingChapter.id,
            chapter_no: formData.chapter_no,
            name: formData.name,
            description: formData.description
        }
        const res = axios.put('http://localhost:5000/chapter/' + editingChapter.id, ChapterData);
        console.log(res);
        setChapters(prev => prev.map(chapter =>
            chapter.id === editingChapter.id
                ? { ...chapter, ...formData }
                : chapter
        ));

        console.log(formData);
        setEditingChapter(null);
    };

    const handleDeleteChapter = async (chapterId) => {
        setIsPopup(true);
        setDeleteChapterId(chapterId);
    };

    const confirmDelete = async () => {
        const res = await axios.delete('http://localhost:5000/chapter/' + deleteChapterId);
        console.log(res);
        setChapters(prev => prev.filter(chapter => chapter.id !== deleteChapterId));
        setIsPopup(false);
    }

    const startEditChapter = (chapter) => {
        setEditingChapter(chapter);
        fetchChapters();
    };

    //useref
    const scrollRef = useRef(null);

    useEffect(() => {
        if (isAddingChapter || editingChapter) {
            scrollToBottom();
        }
    }, [isAddingChapter, editingChapter]);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };
    //useReffffffff
    return (
        <div className="ancient-chapters-container">
            {console.log(chapters)}
            <div className="chapters-manuscript">
                <div className="manuscript-header">
                    <h2 className="chapters-title">
                        <FaScroll className="title-icon" />
                        Sacred Chapters
                    </h2>
                    <div className="illuminated-divider"></div>
                </div>

                <div className="chapters-scroll-area" ref={scrollRef}>
                    {chapters.map(chapter => (
                        <ChapterItem
                            key={chapter.id}
                            chapter={chapter}
                            onEdit={startEditChapter}
                            onDelete={handleDeleteChapter}
                        />
                    ))}

                    {isAddingChapter && (
                        <div className="ancient-chapter-scroll adding-chapter">
                            <div className="chapter-header-parchment">
                                <div className="chapter-header-content">
                                    <div className="chapter-title-section">
                                        <FaChevronDown className="expand-icon" />
                                        <span className="chapter-number">New Chapter</span>
                                    </div>
                                    <FaPlus className="scroll-icon" />
                                </div>
                            </div>
                            <div className="chapter-content-manuscript">
                                <ChapterForm
                                    onSave={handleAddChapter}
                                    onCancel={() => setIsAddingChapter(false)}
                                />
                            </div>
                        </div>
                    )}

                    {editingChapter && (
                        <div className="ancient-chapter-scroll editing-chapter">
                            <div className="chapter-header-parchment">
                                <div className="chapter-header-content">
                                    <div className="chapter-title-section">
                                        <FaChevronDown className="expand-icon" />
                                        <span className="chapter-number">Edit Chapter {editingChapter.chapter_no}</span>
                                    </div>
                                    <FaEdit className="scroll-icon" />
                                </div>
                            </div>
                            <div className="chapter-content-manuscript">
                                <ChapterForm
                                    initialData={editingChapter}
                                    onSave={handleEditChapter}
                                    onCancel={() => setEditingChapter(null)}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <button
                className="add-chapter-fixed-btn"
                onClick={() => { setIsAddingChapter(true); scrollToBottom(); }}
                disabled={isAddingChapter || editingChapter}
            >
                <FaPlus />
            </button>

            {isPopup && (
                <AncientPopup
                    onConfirm={confirmDelete}
                    onClose={() => setIsPopup(false)}
                    message={"Are you want to Delete this Chapter?"}
                    button={"Delete"}
                />
            )}
        </div>


    );
};

export default Chapter;