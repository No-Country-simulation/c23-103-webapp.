const express = require('express');
const userRoutes = require('./user.routes');
const messageRoutes = require('./message.routes');
const roomRoutes = require('./room.routes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/messages', messageRoutes);
router.use('/rooms', roomRoutes);

module.exports = router;
