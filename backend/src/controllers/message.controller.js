const { Message } = require('../models');
const MessageController = {
  // async createMessage(req, res) {
  //   try {
  //     const message = await Message.create(req.body);
  //     res.status(201).json(message);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // },
  // async getRoomMessages(req, res) {
  //   try {
  //     const messages = await Message.findAll({
  //       where: { roomId: req.params.roomId },
  //       include: ['user'],
  //       order: [['createdAt', 'ASC']]
  //     });
  //     res.json(messages);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // },
  async sendMessage (req, res) {
    try {
      const { receiverId, content } = req.body;
      const senderId = req.user.id; // Asignado por authMiddleware
      const message = await Message.create({ senderId, receiverId, content });
      res.status(201).json({ message: 'Message sent', message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getMessages (req, res) {
    try {
      const userId = req.user.id; // Asignado por authMiddleware
      const { userId: otherUserId } = req.params;
      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            { senderId: userId, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: userId },
          ],
        },
        order: [['createdAt', 'ASC']],
      });
      res.status(200).json({ messages });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = MessageController;