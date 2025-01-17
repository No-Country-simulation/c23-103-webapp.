const { Message } = require('../models');
const MessageController = {
  async createMessage(req, res) {
    try {
      const message = await Message.create(req.body);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async getRoomMessages(req, res) {
    try {
      const messages = await Message.findAll({
        where: { roomId: req.params.roomId },
        include: ['user'],
        order: [['createdAt', 'ASC']]
      });
      res.json(messages);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
module.exports = MessageController;