const express = require('express');
const router = express.Router();
const controller = require('../controller/chapterController');

router.get('/chapter/:scripture_id', controller.getChaptersByScriptureID);

router.get('/chapter/chapter/:chapter_id',controller.getChaptersByID);

router.post('/chapter/:scripture_id', controller.addChapter);

router.put('/chapter/:chapter_id', controller.updateChapter);

router.delete('/chapter/:chapter_id', controller.deleteChapter);

module.exports = router;
