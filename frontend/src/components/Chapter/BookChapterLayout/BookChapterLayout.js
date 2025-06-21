import React, { useEffect, useState } from 'react';
import './BookChapterLayout.css';
import Book from '../../Scripture/Book/Book';
import Chapter from '../Chapter/Chapter';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const BookChapterLayout = () => {
    const [selectedBook, setSelectedBook] = useState(null);


    const [searchParams] = useSearchParams();
    const scripture_id = searchParams.get('scripture_id');

    const [scripture, setScripture] = useState({
        _id: '',
        name: '',
        author: '',
        language: '',
        no_of_chapters: '',
        no_of_verse: '',
        description: ''
    });

    const initScripture = async () => {
        if (scripture_id) {
            const res = await axios.get(`http://localhost:5000/scripture/scripture/${scripture_id}`);
            console.log(res.data);
            setScripture({
                _id: scripture_id,
                name: res.data.name,
                author: res.data.author,
                language: res.data.language,
                no_of_chapters: res.data.no_of_chapters,
                no_of_verse: res.data.no_of_verse,
                description: res.data.description
            });
            console.log(scripture);
        }
    }

    useEffect(() => {
        initScripture();
    }, []);

    const handleReadBook = (bookTitle) => {
        setSelectedBook(bookTitle);
        console.log(`Reading: ${bookTitle}`);
    };

    return (

        < div className="ancient-library-layout" >
            {console.log(scripture)}
            <div className="library-section book-section">
                <div className="section-header">
                    <h2 className="section-title">Sacred Scripture</h2>
                    <div className="section-divider"></div>
                </div>
                <div className="book-display">
                    <Book
                        scripture={scripture}
                        onRead={handleReadBook}
                    />
                </div>
            </div>

            <div className="library-section chapters-section">
                <Chapter selectedBook={selectedBook} />
            </div>
        </div >
    );
};

export default BookChapterLayout;