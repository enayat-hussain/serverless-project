'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class States extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  States.init(
    {
      name: DataTypes.STRING,
      countryCode: DataTypes.STRING,
      stateCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'States',
    }
  );
  return States;
};
