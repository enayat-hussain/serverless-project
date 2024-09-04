'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {}
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
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
      status: DataTypes.STRING(50),
      email: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      name: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName ? this.firstName : ''} ${this.lastName ? this.lastName : ''}`;
        },
        set() {
          throw new Error('Do not try to set the `fullName` value!');
        },
      },
      password: DataTypes.STRING(256),
      profileImage: DataTypes.STRING(3000),
      phoneNumber: DataTypes.STRING(20),
      phoneCountryCode: DataTypes.STRING(10),
      clientId: DataTypes.INTEGER,
      isPhoneVerified: DataTypes.BOOLEAN,
      isEmailVerified: DataTypes.BOOLEAN,
      pushNotificationSetting: DataTypes.BOOLEAN,
      emailNotificationSetting: DataTypes.BOOLEAN,
      smsNotificationSetting: DataTypes.BOOLEAN,
      createdBy: DataTypes.INTEGER,
      passCode: DataTypes.STRING,
      timezone: DataTypes.STRING(50),
      projectId: DataTypes.INTEGER,
      userGroupId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Users',
      timestamps: true,
    }
  );
  Users.associate = function (models) {
    Users.belongsTo(models.UserGroups, {
      foreignKey: 'userGroupId',
      as: 'userGroup',
    });
    Users.hasMany(models.Zones, {
      foreignKey: 'id',
      as: 'zones',
    });
  };
  return Users;
};
