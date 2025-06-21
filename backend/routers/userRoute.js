const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');

router.post('/login', controller.loginUser);

router.post('/user', controller.addUser);

router.get('/getallusers', controller.getAllUsers);

router.get('/user/:userid', controller.getUserByUserId);

router.put('/user/:userid', controller.updateUser);

router.delete('/user/:userid', controller.deleteUser);

module.exports = router;