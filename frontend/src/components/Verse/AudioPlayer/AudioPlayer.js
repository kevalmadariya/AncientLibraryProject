// src/components/AudioPlayer/AudioPlayer.js
import React, { useRef, useState, useEffect } from 'react';
import './AudioPlayer.css';
import { Pause, Play } from 'lucide-react';

const AudioPlayer = ({ audioData }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (audioData && audioData.data && audioData.contentType) {
            const byteArray = new Uint8Array(audioData.data.data);
            const blob = new Blob([byteArray], { type: audioData.contentType });
            const url = URL.createObjectURL(blob);
            audioRef.current.src = url;

            return () => URL.revokeObjectURL(url); // Cleanup
        }
    }, [audioData]);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    };

    const stopAudio = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
        setProgress(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (e) => {
        const value = e.target.value;
        audioRef.current.currentTime = value;
        setProgress(value);
    };

    return (
        <div className="audio-player-container">
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            <div className="audio-controls">
                <button onClick={togglePlayPause}>
                    {isPlaying ? (<><Pause /></>) : (<><Play /></>)}
                </button>
                {/* <button onClick={stopAudio}>Stop ⏹</button> */}
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={progress}
                    onChange={handleSeek}
                    className="seek-bar"
                />
                <span className="time-display">
                    {Math.floor(progress)} / {Math.floor(duration)} sec
                </span>
            </div>
        </div>
    );
};

export default AudioPlayer;
