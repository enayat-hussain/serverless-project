'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {}
  Customers.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      companyName: DataTypes.STRING(50),
      companyAddress: DataTypes.STRING,
      status: DataTypes.STRING,
      clientId: DataTypes.INTEGER,
      ownerId: DataTypes.INTEGER,
      otp: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Customers',
    }
  );
  Customers.associate = function (models) {
    Customers.belongsTo(models.Users, {
      foreignKey: 'ownerId',
      as: 'User',
    });
  };
  return Customers;
};
