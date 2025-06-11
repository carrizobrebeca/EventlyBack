const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Message', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
      chatId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
      senderId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    }, 
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

  }, {
    timestamps: true,
  });
};