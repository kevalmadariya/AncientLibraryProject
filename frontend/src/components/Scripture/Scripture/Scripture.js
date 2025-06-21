import React, { useState, useEffect } from 'react';
import Book from '../Book/Book';
import './Scripture.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AncientLoader from '../../../Core/Loader/AncientLoader';

const ScriptureLibrary = () => {

  const navigate = useNavigate();
  const userid = localStorage.getItem('userId');
  const [scriptures, setScriptures] = useState([]);
  const [Loading, setLoading] = useState(false);

  const fetchScriptures = async () => {
    setLoading(true);

    axios.get('http://localhost:5000/allscripture')
      .then(response => {
        setScriptures(response.data);
        console.log(response.data); // Logs the fetched data
      })
      .catch(error => {
        console.error('Error fetching scriptures:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchScriptures();
  }, []);

  // useEffect(() => {
  //   console.log(scriptures); // Logs updated scriptures after setScriptures runs
  // }, [scriptures]);

  const handlescripture = () => {
    navigate('/scriptureForm');
  }

  return (
    <div className="scripture-library">
      <header className="library-header">
        <h1>Ancient Scripture Library</h1>
        <p>
          Explore timeless wisdom through sacred texts with Sanskrit verses,
          translations, and deep insights.
        </p>
      </header>

      {userid && (
        <>
          <button className="fixed-btn" onClick={handlescripture}>
            Add
            <i className="fas fa-scroll"></i>
          </button>
        </>
      )}

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />

      <div className="book-shelf">
        {scriptures?.length > 0 ? (
          scriptures.map((scripture) => (
            <Book
              key={scripture._id}
              scripture={scripture}
              onDeleteSuccess={fetchScriptures}
            />
          ))
        ) : (
          Loading && <AncientLoader />
        )}
      </div>

    </div>
  );
};

export default ScriptureLibrary;