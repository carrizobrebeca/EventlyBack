
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('EventInvitation', {
    status: {
    type: DataTypes.STRING,
    defaultValue: "pending", // o "accepted", "rejected"
  }
  }, {
    timestamps: true,
  });
};
