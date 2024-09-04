'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;

    return queryInterface.createTable('Zones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(100),
      },
      status: {
        type: DataTypes.STRING,
      },
      addedBy: {
        type: DataTypes.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      clientId: {
        type: DataTypes.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Clients',
          key: 'id',
        },
      },
      // property_id: {
      //   type: DataTypes.INTEGER,
      //   onDelete: 'SET NULL',
      //   references: {
      //     model: 'Properties',
      //     key: 'id',
      //   },
      // },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Zones');
  },
};
