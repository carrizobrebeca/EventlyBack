const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Notification = sequelize.define("Notification", {
  type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    actorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    postId: {
  type: DataTypes.UUID,
  allowNull: true,
},
  });

  return Notification;
};
