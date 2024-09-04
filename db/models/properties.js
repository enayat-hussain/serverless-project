'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Properties extends Model {}
  Properties.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      addressLine1: DataTypes.STRING,
      addressLine2: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      timezone: DataTypes.STRING(50),
      county: DataTypes.STRING(100),
      country: DataTypes.STRING(100),
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      status: DataTypes.STRING(50),
      stateCode: DataTypes.STRING,
      locationNumber: DataTypes.INTEGER,
      locationName: DataTypes.STRING,
      type: DataTypes.STRING,
      clientId: DataTypes.INTEGER,
      addedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Properties',
    }
  );
  Properties.associate = function (models) {
    Properties.belongsTo(models.Clients, {
      foreignKey: 'clientId',
      as: 'Client',
    });
  };
  return Properties;
};
