'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Timezones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Timezones.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      relativeToGmt: DataTypes.STRING,
      visible: DataTypes.BOOLEAN,
      sequenceName: DataTypes.INTEGER,
      zone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Timezones',
    }
  );
  return Timezones;
};
