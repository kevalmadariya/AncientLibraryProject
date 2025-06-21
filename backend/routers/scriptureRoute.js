const express = require('express');
const router = express.Router();
const controller = require('../controller/scriptureController');

router.get('/scripture/user/:user_id', controller.getScriptureByUserId);

router.get('/scripture/scripture/:scripture_id', controller.getScriptureByScriptureId);

router.get('/allscripture', controller.getAllScripture);

router.post('/scripture/:user_id', controller.addScripture);

router.put('/scripture/:scripture_id', controller.updateScripture);

router.delete('/scripture/:scripture_id', controller.deleteScripture);

module.exports = router