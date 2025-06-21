const express = require('express');
const router = express.Router();
const controller = require('../controller/superstitionController');

router.get('/superstition/:user_id',controller.getsuperstitionsByUserID);

router.post('/superstition',controller.addsuperstition);

router.put('/superstition',controller.updatesuperstition);

router.delete('/superstition',controller.deletesuperstition);

module.exports = router;