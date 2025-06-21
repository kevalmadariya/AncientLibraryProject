import React, { useEffect, useState } from 'react';
import { MessageCircle, ChevronUp, ChevronDown } from 'lucide-react';
import CommentItem from '../CommentItem/CommentItem';
import '../Verse.css';
import axios from 'axios';

const CommentsSection = ({ verse, onAddComment }) => {
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    const fetchCommets = async () => {
        axios.get('http://localhost:5000/comment/verse/' + verse._id)
            .then(response => {
                setComments(response.data);
                console.log(response);
            })
            .catch(error => {
                console.log("Error while ferthing comment" + error);
            })
    }

    useEffect(() => {
        fetchCommets();
    }, []);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        onAddComment(newComment);
        fetchCommets();
        setNewComment('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddComment();
        }
    };

    return (
        <div className="comments-section">
            <div className="comments-header" onClick={toggleComments}>
                <MessageCircle size={16} />
                {/* Comments ({verse.comments.length}) */}
                {showComments ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {showComments && (
                <>
                    <div className="comment-input">
                        <input
                            type="text"
                            className="comment-text-input"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            className="comment-submit-btn"
                            onClick={handleAddComment}
                        >
                            Post
                        </button>
                    </div>
                    <div className='comment-list-scroll'>
                        {comments.map((comment) => (
                            <CommentItem key={comment._id} comment={comment} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CommentsSection;