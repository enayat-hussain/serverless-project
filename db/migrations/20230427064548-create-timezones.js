'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Timezones', {
      code: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      relativeToGmt: {
        type: Sequelize.STRING,
      },
      visible: {
        type: Sequelize.BOOLEAN,
      },
      sequenceName: {
        type: Sequelize.INTEGER,
      },
      zone: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Timezones');
  },
};
