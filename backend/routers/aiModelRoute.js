const express = require('express');
const router = express.Router();
const controller = require('../controller/aimodelController');

router.get('/model', controller.getKeyWords);

router.post('/model/suggest', controller.suggestVerses);

module.exports = router;
