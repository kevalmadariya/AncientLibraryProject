const express = require('express');
const router = express.Router();
const controller = require('../controller/commentController');

router.get('/comment/verse/:verse_id', controller.getCommentsByVerseID);

router.get('/comment/user/:user_id', controller.getCommentByUserId);

router.post('/comment/:user_id', controller.addComment);

router.put('/comment/:comment_id', controller.updateComment);

router.delete('/comment/:comment_id', controller.deleteComment);

module.exports = router;
