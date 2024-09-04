'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrganizationalSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      endDeviceTypes: {
        type: Sequelize.JSONB,
      },
      alertTypes: {
        type: Sequelize.JSONB,
      },
      dashboardTabs: {
        type: Sequelize.JSONB,
      },
      features: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      programmableEndDevices: {
        type: Sequelize.JSONB,
      },
      userRoles: {
        type: Sequelize.JSONB,
      },
      treeTypes: {
        type: Sequelize.JSONB,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrganizationalSettings');
  },
};
