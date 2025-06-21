import TranslationSection from '../TranslationSection/TranslationSection';
import MediaControls from '../MediaControls/MediaControls';
import CommentsSection from '../CommentsSection/CommentsSection';
import '../Verse.css';
import { useState } from 'react';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

const VerseContent = ({ verse, onAddComment }) => {
    const [translationMode, setTranslationMode] = useState(null);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const [isAudioPlay, setIsAudioPlay] = useState(false);

    const toggleTranslation = (mode) => {
        setTranslationMode(translationMode === mode ? null : mode);
    };

    const toggleVideoPlayer = () => {
        setShowVideoPlayer(!showVideoPlayer);
    };

    // const playAudio = (audioUrl) => {
    //     const fileId = audioUrl.match(/\/d\/(.+?)\//)?.[1];
    //     console.log(fileId);
    //     if (fileId) {
    //         const directUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    //         const audio = new Audio(directUrl);
    //         audio.play().catch(err => {
    //             alert('Audio playback failed. Please check the audio link.');
    //         });
    //     }
    // };
    const playAudio = (audio) => {
        setIsAudioPlay(true);
        // if (!audio || !audio.data || !audio.contentType) {
        //     alert("No valid audio available.");
        //     return;
        // }

        // // Convert Uint8Array to base64 string
        // const byteArray = new Uint8Array(audio.data.data);
        // console.log(byteArray);
        // const blob = new Blob([byteArray], { type: audio.contentType });
        // const url = URL.createObjectURL(blob);

        // const player = new Audio(url);
        // player.play().catch(err => {
        //     console.error("Playback error:", err);
        //     alert('Audio playback failed.');
        // });
    };

    const displayverse = verse.sanskrit_script.replace(/\\n/g, '\n');
    return (
        <>
            <div className="sanskrit-text">
                {displayverse}
            </div>

            <TranslationSection
                verse={verse}
                translationMode={translationMode}
                onToggleTranslation={toggleTranslation}
            />

            <div className="interpretation-section">
                <strong>Interpretation:</strong> {verse.interpretation}
            </div>

            <div className="verse-details">
                <div className="detail-item">
                    <span className="detail-label">Spoken by:</span>
                    <span className="detail-value">{verse.who_tell}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Spoken to:</span>
                    <span className="detail-value">{verse.whome_to_tell}</span>
                </div>
            </div>

            <MediaControls
                verse={verse}
                showVideoPlayer={showVideoPlayer}
                onPlayAudio={() => playAudio(verse.audio)}
                onToggleVideo={toggleVideoPlayer}
            />

            {isAudioPlay && (
                <>
                    <AudioPlayer audioData={verse.audio} />
                </>
            )}
            <CommentsSection
                verse={verse}
                onAddComment={onAddComment}
            />
        </>
    );
};

export default VerseContent;