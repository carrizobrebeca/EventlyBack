const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Event', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    ,
    creatorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    eventDate: {
      type: DataTypes.DATEONLY, // Solo la fecha (YYYY-MM-DD)
      allowNull: false,
    },
    eventTime: {
      type: DataTypes.TIME, // Solo la hora (HH:mm:ss)
      allowNull: false,
    }
  }, {

    timestamps: true, // Habilita los timestamps (createdAt y updatedAt)
  });
};
