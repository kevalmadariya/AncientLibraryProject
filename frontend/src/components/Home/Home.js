// src/components/Home.js
import React, { useContext } from 'react';
import './Home.css';
import { UserContext } from '../Auth/Context/UserContext';

const Home = () => {
    const username = localStorage.getItem('username') ? localStorage.getItem('username') : 'Guest';
    const { user } = useContext(UserContext);
    console.log("from usercontetx");
    console.log(user);
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>📚 Ancient Library</h1>
                <p className="welcome-text">Welcome, <strong>{username}</strong>!</p>
            </header>

            <main className="home-main">
                <section className="intro">
                    <h2>Discover Timeless Knowledge</h2>
                    <p>
                        Step into the Ancient Library — a place where stories from the past,
                        forgotten scrolls, and eternal wisdom await your curiosity.
                    </p>
                </section>

                <section className="actions">
                    <button className="explore-btn">Explore Books</button>
                    <button className="profile-btn">My Profile</button>
                </section>
            </main>
        </div>
    );
};

export default Home;
