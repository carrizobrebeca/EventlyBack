const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Chat', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
      user1Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
      user2Id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    }
  }, {
    timestamps: true,
  });
};