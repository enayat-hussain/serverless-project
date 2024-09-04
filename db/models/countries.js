'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Countries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Countries.init(
    {
      name: DataTypes.STRING,
      countryCode: DataTypes.STRING(10),
    },
    {
      sequelize,
      modelName: 'Countries',
    }
  );
  return Countries;
};
