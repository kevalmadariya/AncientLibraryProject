import { Volume2, Play } from 'lucide-react';
import '../Verse.css';

const MediaControls = ({ verse, showVideoPlayer, onPlayAudio, onToggleVideo }) => {
    const getYouTubeEmbedUrl = (url) => {
        const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)(.+?)(?:\&|$)/)?.[1];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    };

    return (
        <>
            <div className="media-controls">
                <button className="media-btn audio-btn" onClick={onPlayAudio}>
                    <Volume2 size={16} />
                    Play Audio
                </button>
                <button className="media-btn video-btn" onClick={onToggleVideo}>
                    <Play size={16} />
                    {showVideoPlayer ? 'Hide Video' : 'Play Video'}
                </button>
            </div>

            {showVideoPlayer && (
                <div className="video-player">
                    <iframe
                        src={getYouTubeEmbedUrl(verse.video)}
                        title={`Verse ${verse.verse_no} Video`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </>
    );
};

export default MediaControls;