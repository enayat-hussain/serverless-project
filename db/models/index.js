/* eslint-disable max-len */

'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const basename = path.basename(__filename);
let db = {};

let sequelize;
sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  logging: console.log,
  // logging: false,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'postgres',
});
fs.readdirSync(__dirname)
  .filter((file) => {
    // eslint-disable-next-line max-len
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;
module.exports = db;
