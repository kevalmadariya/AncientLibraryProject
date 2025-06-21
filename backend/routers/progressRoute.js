const express = require('express');
const router = express.Router();
const controller = require('../controller/progressController');

router.get('/progress/:user_id',controller.getProgressByUserId);

router.post('/progress',controller.addProgress);

router.put('/progress/:progress_id',controller.updateProgress);

router.delete('/progress/:progress_id',controller.deleteProgress);

module.exports = router;
