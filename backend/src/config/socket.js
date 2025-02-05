const socketIO = require('socket.io');
const ConversationController = require('../controllers/conversation.controller');

const setupSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:8080",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    console.log(`Usuario conectado con ID: ${userId}`);

    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on('send_message', (data) => {
      io.to(data.roomId).emit('receive_message', data);
    });

    socket.on("sendMessage", (data) => {
      io.emit("newMessage", data)
      io.emit("updateMessages")
    })

    socket.on("newConversation", () => {
      io.emit("updateConversation")
    })

    socket.on("resetNotifications", (conversationId) => {
      ConversationController.updateConversation({conversationId, unreadCount : "reset"})
      io.emit("notificacionReaded")
    })

    socket.on("deleteConversation", (conversationId) => {
      io.emit("conversationDeleted")
    })

    socket.on('disconnect', () => {
      console.log('Usuario desconectado:', socket.id);
    });
  });

  return io;
};

module.exports = setupSocket;