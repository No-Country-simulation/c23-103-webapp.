// controllers/groupController.js
const { Op, Sequelize } = require('sequelize');
const { Conversation, User } = require('../models');

const ConversationController = {
    async createConversation (req, res) {
        try {
            const { name, isGroup, userIds } = req.body;
            // Verificar que los usuarios existan
            const users = await User.findAll({ where: { id: userIds } });
            if (users.length !== userIds.length) {
              return res.status(400).json({ error: 'Uno o más usuarios no existen.' });
            }
        
            // Crear la conversación
            const conversation = await Conversation.create({ name, isGroup });
        
            // Asociar usuarios a la conversación
            await conversation.addUsers(userIds);
        
            res.status(201).json({ message: 'Conversación creada con éxito.', conversation });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    },
    async getUserConversations (req, res) {
        try {
            const userId = req.user.id; // ID del usuario autenticado
            
            // Obtener todas las conversaciones del usuario
            const conversations = await Conversation.findAll({
                include: [
                    {
                        model: User,
                        //   where: { id: userId }, // Filtrar conversaciones del usuario actual
                        attributes: ['id', 'username', 'profileImage'], // Atributos visibles de los usuarios
                        where: {
                            id: {
                                [Op.ne]: userId, // Excluimos al usuario autenticado
                            },
                        },
                        through: { attributes: [] },
                    },
                ],
                where: {
                    id: {
                        [Op.in]: Sequelize.literal(`(
                            SELECT "conversationId"
                            FROM "UserConversation"
                            WHERE "userId" = '${userId}'
                            )`),
                        },
                    },
                });
        
            res.status(200).json({ conversations });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    },
    async getConversationById (req, res) {
        try {
            const { id } = req.params; // ID de la conversación
        
            const conversation = await Conversation.findOne({
              where: { id },
              include: [
                {
                  model: User,
                  attributes: ['id', 'username'],
                },
              ],
            });
        
            if (!conversation) {
              return res.status(404).json({ error: 'Conversación no encontrada.' });
            }
        
            res.status(200).json({ conversation });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    },

    async deleteConversation (req, res) {
        try {
            const { id } = req.params; // ID de la conversación
        
            const conversation = await Conversation.findByPk(id);
        
            if (!conversation) {
              return res.status(404).json({ error: 'Conversación no encontrada.' });
            }
        
            await conversation.destroy(); // Eliminar la conversación
        
            res.status(200).json({ message: 'Conversación eliminada con éxito.' });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
};

module.exports = ConversationController;
