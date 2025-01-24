const { Message, Conversation, User } = require('../models');
const MessageController = {
  async sendMessage (req, res) {
    try {
      const { conversationId, content, receiverId } = req.body;
      // Verificar que la conversación exista
      const conversation = await Conversation.findByPk(conversationId);
      if (!conversation) {
        return res.status(404).json({ error: 'Conversación no encontrada.' });
      }
  
      // Verificar que el receptor exista
      const receiver = await User.findByPk(receiverId);
      if (!receiver) {
        return res.status(404).json({ error: 'Receptor no encontrado.' });
      }
  
      // Crear el mensaje
      const message = await Message.create({ content, conversationId, senderId, receiverId });
  
      res.status(201).json({ message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getMessages (req, res) {
    try {
      const { conversationId } = req.params;
  
      // Verificar que la conversación exista
      const conversation = await Conversation.findByPk(conversationId);
      if (!conversation) {
        return res.status(404).json({ error: 'Conversación no encontrada.' });
      }
  
      // Obtener los mensajes de la conversación
      const messages = await Message.findAll({
        where: { conversationId },
        include: [
          {
            model: User,
            as: 'sender',
            attributes: ['id', 'username'], // Información básica del remitente
          },
          {
            model: User,
            as: 'receiver',
            attributes: ['id', 'username'], // Información básica del receptor
          },
        ],
        order: [['createdAt', 'ASC']], // Ordenar por fecha de creación
      });
  
      res.status(200).json({ messages });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = MessageController;