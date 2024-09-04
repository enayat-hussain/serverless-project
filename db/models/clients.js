'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Clients extends Model {}
  Clients.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      companyName: DataTypes.STRING,
      status: DataTypes.STRING,
      companyLogo: DataTypes.STRING,
      companyFavicon: DataTypes.STRING,
      companyFooterText: DataTypes.STRING,
      address1: DataTypes.STRING,
      address2: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      country: DataTypes.STRING,
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      stateCode: DataTypes.STRING,
      shortCode: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      timestamps: true,
      sequelize,
      modelName: 'Clients',
    }
  );

  Clients.associate = function (models) {
    Clients.hasMany(models.Zones, { foreignKey: 'clientId', allowNull: true, as: 'zones' });
    Clients.hasMany(models.Users, { foreignKey: 'clientId', as: 'users' });
  };

  return Clients;
};
