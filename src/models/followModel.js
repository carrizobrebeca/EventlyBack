const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Follow', {}, { timestamps: false });
};
