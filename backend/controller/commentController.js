const Comment = require('../models/Comment');

const addComment = async (req, res) => {
    console.log("addd");
    const user_id = req.params.user_id;
    try {
        const comment = new Comment({ ...req.body, user_id: user_id });
        await comment.save();
        res.status(201).json({ message: 'Comment Added Successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' + err });
    }
}

const getCommentsByVerseID = async (req, res) => {
    const verse_id = req.params.verse_id;
    try {
        const comment = await Comment.find({ verse_id: verse_id });
        if (!comment) {
            res.status(404).json({ message: 'Comment Not Found' });
        }
        res.json(comment);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const getCommentByUserId = async (req, res) => {
    console.log("start");
    const user_id = req.params.user_id;
    try {
        const comment = await Comment.find({ user_id: user_id });
        console.log("comment");
        if (!comment) {
            res.status(404).json({ message: 'Comment Not found' });
        }
        res.json(comment);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const updateComment = async (req, res) => {
    const comment_id = req.params.comment_id;
    try {
        const comment = await Comment.updateOne({ _id: comment_id }, { $set: req.body });
        if (!comment) {
            res.staus(404).json({ message: 'Comment Not found' });
        }
        res.json({ messsage: 'Comment Updated Succecfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' + err });
    }
}

const deleteComment = async (req, res) => {
    const comment_id = req.params.comment_id;
    try {
        const comment = await Comment.deleteOne({ _id: comment_id }, { $set: req.body });
        if (!comment) {
            res.staus(404).json({ message: 'comment Not found' });
        }
        res.json({ messsage: 'Comment Deleted Succecfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' + err });
    }
}

module.exports = {
    addComment,
    getCommentByUserId,
    updateComment,
    deleteComment,
    getCommentsByVerseID,
}