'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Gateways', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      device_id: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING(50),
      },
      description: {
        type: Sequelize.STRING(1000),
      },
      location: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      image_url: {
        type: Sequelize.STRING(2083),
      },
      IMEI: {
        type: Sequelize.STRING,
      },
      IMSI: {
        type: Sequelize.STRING,
      },
      cell_provided: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING(20),
      },
      battery_voltage: {
        type: Sequelize.DOUBLE,
      },
      rssi: {
        type: Sequelize.DOUBLE,
      },
      snr: {
        type: Sequelize.DOUBLE,
      },
      latitude: {
        type: Sequelize.DOUBLE(15, 7),
      },
      longitude: {
        type: Sequelize.DOUBLE(15, 7),
      },
      firmware_version: {
        type: Sequelize.STRING(20),
      },
      bluetooth_mac: {
        type: Sequelize.STRING,
      },
      wifi_mac: {
        type: Sequelize.STRING,
      },
      last_check_in: {
        type: Sequelize.DATE,
      },
      manufacturer_date: {
        type: Sequelize.DATE,
      },
      installation_date: {
        type: Sequelize.DATE,
      },
      error_code: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      property_id: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Properties',
          key: 'id',
          as: 'property_id',
        },
      },
      client_id: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Clients',
          key: 'id',
          as: 'client_id',
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Gateways');
  },
};
