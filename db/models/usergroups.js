'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGroups extends Model {}
  UserGroups.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      permissions: DataTypes.JSONB,
      status: DataTypes.STRING,
      clientId: DataTypes.INTEGER,
      platform: DataTypes.STRING,
      default: DataTypes.BOOLEAN,
      type: {
        type: DataTypes.ENUM,
        values: ['oxit', 'client', 'customer'],
      },
      role: {
        type: DataTypes.ENUM,
        values: [
          'administrator',
          'customer_service',
          'distributor',
          'sales',
          'owner',
          'client_administrator',
          'read_only',
          'user',
        ],
      },
    },
    {
      sequelize,
      modelName: 'UserGroups',
      timestamps: true,
    }
  );
  UserGroups.associate = function (models) {
    UserGroups.belongsTo(models.Clients, {
      foreignKey: 'clientId',
      as: 'Client',
    });
    UserGroups.hasMany(models.Users, {
      foreignKey: 'userGroupId',
      as: 'Users',
    });
  };
  return UserGroups;
};
