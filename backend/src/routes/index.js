const express = require('express');
const userRoutes = require('./user.routes');
const messageRoutes = require('./message.routes');
const roomRoutes = require('./room.routes');
const contactRoutes = require('./contact.routes');
const groupRoutes = require('./group.routes');
const translateRoutes = require('./translate.routes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/messages', messageRoutes);
router.use('/rooms', roomRoutes);
router.use('/contacts', contactRoutes);
router.use('/contacts', groupRoutes);
router.use('/translate', translateRoutes);

module.exports = router;
