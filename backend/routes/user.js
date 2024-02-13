const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');

router.get('/login', UserController.loginUser);

module.exports = router;
