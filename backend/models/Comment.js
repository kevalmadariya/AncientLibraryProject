const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user: {
        type: String,
        reqiure: true
    },
    verse_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Verse',
        required: true
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
    replayed_comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    comment_liked_user:{
        type: [String],
        default: []
    },
    comment_disliked_user:{
        type: [String],
        default: []
    },
    created_at: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Comment', commentSchema);