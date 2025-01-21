module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    receiverId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: true
    }, // Null si es un mensaje privado
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  });
  Message.associate = (models) => {
    Message.belongsTo(models.User, { foreignKey: 'senderId' });
    Message.belongsTo(models.User, { foreignKey: 'receiverId' });
  };
  return Message;
};