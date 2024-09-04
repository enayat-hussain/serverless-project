'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'UserGroups',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          name: {
            type: Sequelize.STRING,
          },
          permissions: {
            type: Sequelize.JSONB,
          },
          status: {
            type: Sequelize.STRING,
          },
          clientId: {
            type: Sequelize.INTEGER,
            onDelete: 'SET NULL',
            allowNull: true,
            references: {
              model: 'Clients',
              key: 'id',
              as: 'clientId',
            },
          },
          type: {
            type: Sequelize.ENUM,
            values: ['oxit', 'client', 'customer'],
          },
          role: {
            type: Sequelize.ENUM,
            values: [
              'administrator',
              'user',
              'customer_service',
              'sales',
              'owner',
              'client_administrator',
              'read_only',
            ],
          },
          platform: {
            type: Sequelize.STRING,
          },
          default: {
            type: Sequelize.BOOLEAN,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        },
        {
          transaction,
        }
      );
      let UserGroup = [
        {
          name: 'Oxit Admin',
          permissions: JSON.stringify({
            client: ['full_access'],
            user: ['full_access'],
            user_group: ['full_access'],
            customer_account: ['full_access'],
            transfer_ownership: [],
            property: ['full_access'],
            zone: ['full_access'],
            gateway: ['full_access'],
            device: ['full_access'],
            device_modal: ['full_access'],
            dashboard: ['full_access'],
            alert_threshold: ['full_access'],
            notification_setting: ['full_access'],
            fuota: ['full_access'],
            firmware: ['full_access'],
            lns_configurations: ['full_access'],
          }),
          status: 'active',
          type: 'oxit',
          role: 'administrator',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Oxit User',
          permissions: JSON.stringify({
            client: ['view_only'],
            user_group: ['view_only'],
            user: ['full_access'],
            customer_account: ['view_only'],
            transfer_ownership: [],
            property: ['full_access'],
            zone: ['full_access'],
            gateway: ['full_access'],
            device: ['full_access'],
            device_modal: ['full_access'],
            dashboard: ['full_access'],
            alert_threshold: ['full_access'],
            notification_setting: ['full_access'],
            fuota: ['full_access'],
            firmware: ['full_access'],
            lns_configurations: ['full_access'],
          }),
          status: 'active',
          type: 'oxit',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Client Admin',
          permissions: JSON.stringify({
            client: [],
            user_group: [],
            user: ['full_access'],
            customer_account: ['full_access'],
            transfer_ownership: [],
            property: ['full_access'],
            zone: ['full_access'],
            gateway: ['full_access'],
            device: ['full_access'],
            device_modal: ['full_access'],
            dashboard: ['full_access'],
            alert_threshold: ['full_access'],
            notification_setting: ['full_access'],
            fuota: ['full_access'],
            firmware: ['full_access'],
            lns_configurations: ['full_access'],
          }),
          status: 'active',
          type: 'client',
          role: 'administrator',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Customer Admin',
          permissions: JSON.stringify({
            client: [],
            user_group: [],
            user: ['full_access'],
            customer_account: [],
            transfer_ownership: [],
            property: ['full_access'],
            zone: ['full_access'],
            gateway: ['full_access'],
            device: ['full_access'],
            device_modal: ['full_access'],
            dashboard: ['full_access'],
            alert_threshold: ['full_access'],
            notification_setting: ['full_access'],
            fuota: ['full_access'],
            firmware: ['full_access'],
            lns_configurations: ['full_access'],
          }),
          status: 'active',
          type: 'customer',
          role: 'administrator',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Customer Owner',
          permissions: JSON.stringify({
            client: [],
            user_group: [],
            user: ['full_access'],
            customer_account: [],
            transfer_ownership: ['full_access'],
            property: ['full_access'],
            zone: ['full_access'],
            gateway: ['full_access'],
            device: ['full_access'],
            device_modal: ['full_access'],
            dashboard: ['full_access'],
            alert_threshold: ['full_access'],
            notification_setting: ['full_access'],
            fuota: ['full_access'],
            firmware: ['full_access'],
            lns_configurations: ['full_access'],
          }),
          status: 'active',
          type: 'customer',
          role: 'owner',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Customer User',
          permissions: JSON.stringify({
            client: [],
            user_group: [],
            user: [],
            customer_account: [],
            transfer_ownership: [],
            property: ['view_only'],
            zone: ['view_only'],
            gateway: ['view_only'],
            device: ['view_only'],
            device_modal: ['view_only'],
            dashboard: ['view_only'],
            alert_threshold: ['view_only'],
            notification_setting: ['view_only'],
            fuota: ['view_only'],
            firmware: ['view_only'],
            lns_configurations: ['view_only'],
          }),
          status: 'active',
          type: 'customer',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      await queryInterface.bulkInsert('UserGroups', UserGroup, {
        transaction,
      });
      await transaction.commit();
      return Promise.resolve();
    } catch (err) {
      console.log('err :', err);
      if (transaction) {
        await transaction.rollback();
      }
      return Promise.reject(err);
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // rename the existing type
      await queryInterface.dropTable('UserGroups', { transaction });

      await queryInterface.sequelize.query('DROP TYPE "enum_UserGroups_type"', {
        transaction,
      });
      await queryInterface.sequelize.query('DROP TYPE "enum_UserGroups_role"', {
        transaction,
      });
      await transaction.commit();
      return Promise.resolve();
    } catch (err) {
      if (transaction) {
        await transaction.rollback();
      }
      return Promise.reject(err);
    }
  },
};
