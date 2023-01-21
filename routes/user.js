const express = require('express');
const router = express.Router();
const { postLogin, registerUser } = require('./controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/login', verifyToken, postLogin);
router.post('/register', registerUser);

module.exports = router;
