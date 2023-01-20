const express = require('express');
const router = express.Router();
const { postUser } = require('./controllers/login.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, postUser);

module.exports = router;
