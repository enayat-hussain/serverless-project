'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Zones extends Model {}
  Zones.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING(100),
      status: DataTypes.STRING,
    },
    {
      timestamps: true,
      sequelize,
      modelName: 'Zones',
    }
  );

  Zones.associate = function (models) {
    Zones.belongsTo(models.Clients, { foreignKey: 'clientId', allowNull: true, as: 'client' });
    Zones.belongsTo(models.Users, {
      foreignKey: 'addedBy',
      onDelete: 'SET NULL',
      as: 'user',
      allowNull: true,
    });
  };
  return Zones;
};
