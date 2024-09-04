'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrganizationalSettings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrganizationalSettings.init(
    {
      endDeviceTypes: DataTypes.JSONB,
      alertTypes: DataTypes.JSONB,
      dashboardTabs: DataTypes.JSONB,
      features: DataTypes.ARRAY(DataTypes.TEXT),
      programmableEndDevices: DataTypes.JSONB,
      userRoles: DataTypes.JSONB,
      treeTypes: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: 'OrganizationalSettings',
      timestamps: true,
    }
  );
  return OrganizationalSettings;
};
