const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const UserController = require('../controller/user');


router.post('/signup', UserController.createUser);
router.get('/checktoken', UserController.checkToken)
router.use('/user', userRoutes);

module.exports = router;