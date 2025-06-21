import { ThumbsUp, ThumbsDown, Reply, Heart, Share2, Flag } from 'lucide-react';
import '../Verse.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CommentItem = ({ comment }) => {
    const username = localStorage.getItem('username');
    const [isLike, setIsLike] = useState(false);
    const [isDisLike, setIsDisLike] = useState(false);
    const [isAlreadyLiked, setIsAlreadyLiked] = useState(false);
    const [isAlreadyDisLiked, setIsAlreadyDisLiked] = useState(false);

    const setAlreadyLikeDisLike = () => {
        if (comment.comment_liked_user.indexOf(username) > -1) {
            setIsAlreadyLiked(true);
            setIsLike(true);
        }
        if (comment.comment_disliked_user.indexOf(username) > -1) {
            setIsAlreadyDisLiked(true);
            setIsDisLike(true);
        }
    };

    useEffect(() => {
        setAlreadyLikeDisLike();
    }, [])
    const addtoggleLike = () => {
        console.log(comment);

        if (isLike) {
            setIsLike(false);
            setIsAlreadyLiked(false);
            const index = comment.comment_liked_user.indexOf(username);
            comment.comment_liked_user.splice(index, 1);
            comment.like--;
            updateComment();
        } else if (!isDisLike) {
            setIsLike(true);
            comment.comment_liked_user.push(username);
            comment.like++;
            updateComment();
        }
    }

    const addtoggleDisLike = () => {
        if (isDisLike) {
            setIsDisLike(false);
            setIsAlreadyDisLiked(false);
            const index = comment.comment_disliked_user.indexOf(username);
            comment.comment_disliked_user.splice(index, 1);
            comment.dislike--;
            updateComment();
        } else if (!isLike) {
            setIsDisLike(true);
            comment.comment_disliked_user.push(username);
            comment.dislike++;
            updateComment();
        }
    }

    const updateComment = () => {
        axios.put('http://localhost:5000/comment/' + comment._id, comment)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log("Error while update comment" + error);
            })
    }

    return (
        <div className="comment-item">
            <div className="comment-header">
                <span className="comment-user">{comment.user}:</span>
                <span className="comment-timestamp">{comment.created_at}</span>
            </div>
            <div>{comment.comment}</div>
            <div className="comment-actions">
                <button className="comment-action-btn">
                    <ThumbsUp size={12} fill={(isLike) ? '#6b3e1a' : 'none'} onClick={addtoggleLike} />
                    {comment.like}
                </button>
                <button className="comment-action-btn">
                    <ThumbsDown size={12} fill={(isDisLike) ? '#6b3e1a' : 'none'} onClick={addtoggleDisLike} />
                    {comment.dislike}
                </button>
                {/* <button className="comment-action-btn">
                    <Reply size={12} />
                    Reply
                </button>
                <button className="comment-action-btn">
                    <Heart size={12} />
                    ❤️
                </button>
                <button className="comment-action-btn">
                    <Share2 size={12} />
                </button>
                <button className="comment-action-btn">
                    <Flag size={12} />
                </button> */}
            </div>
        </div>
    );
};

export default CommentItem;