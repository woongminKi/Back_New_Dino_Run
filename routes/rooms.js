const express = require('express');
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const { registerRoom, getRoomInfo } = require('./controllers/rooms.controller');

router.post('/:id', verifyToken, registerRoom);
router.get('/:id', verifyToken, getRoomInfo);

module.exports = router;
