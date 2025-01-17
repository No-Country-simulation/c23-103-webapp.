const express = require('express');
const MessageController = require('../controllers/message.controller');


const router = express.Router();

router.post('/', MessageController.createMessage);
router.get('/room/:roomId', MessageController.getRoomMessages);

module.exports = router;
