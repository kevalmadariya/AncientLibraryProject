const express = require('express');
const router = express.Router();
const controller = require('../controller/verseController');
const upload = require('../util/upload');
const multer = require('multer');

const filestorage = multer.memoryStorage();
const fileupload = multer({ storage: filestorage });

router.post('/verse/:chapter_id', upload.single('audio'), controller.addVerse)

router.post('/verse/file/:chapter_id', fileupload.single('file'), controller.addVerseByFile)

router.get('/verse/:chapter_id', controller.getVerseByChapterId)

router.put('/verse/:verse_id', upload.single('audio'), controller.updateVerse)

router.delete('/verse/:verse_id', controller.deleteVerse)

module.exports = router;