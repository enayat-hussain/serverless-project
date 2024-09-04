'use strict';

const { generateSalt, encryptPassword } = require('../../src/utils/utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'Users',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          type: {
            type: Sequelize.ENUM,
            values: ['oxit', 'client', 'customer'],
          },
          role: {
            type: Sequelize.ENUM,
            values: ['administrator', 'customer_service', 'sales', 'owner', 'client_administrator', 'read_only'],
          },
          status: {
            type: Sequelize.STRING(50),
          },
          email: {
            type: Sequelize.STRING,
          },
          firstName: {
            type: Sequelize.STRING,
          },
          lastName: {
            type: Sequelize.STRING,
          },
          name: {
            type: Sequelize.STRING,
          },
          password: { type: Sequelize.STRING(256) }, // Salted Password [Hashed]
          profileImage: { type: Sequelize.STRING(3000) },
          phoneNumber: { type: Sequelize.STRING(20) },
          phoneCountryCode: { type: Sequelize.STRING(10) },
          isPhoneVerified: { type: Sequelize.BOOLEAN },
          isEmailVerified: { type: Sequelize.BOOLEAN },
          pushNotificationSetting: { type: Sequelize.BOOLEAN },
          emailNotificationSetting: { type: Sequelize.BOOLEAN },
          smsNotificationSetting: { type: Sequelize.BOOLEAN },
          createdBy: { type: Sequelize.INTEGER },
          passCode: { type: Sequelize.STRING },
          timezone: { type: Sequelize.STRING(50) },
          userGroupId: {
            type: Sequelize.INTEGER,
            onDelete: 'SET NULL',
            allowNull: true,
            references: {
              model: 'UserGroups',
              key: 'id',
              as: 'userGroupId',
            },
          },
          projectId: { type: Sequelize.INTEGER },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          clientId: {
            type: Sequelize.INTEGER,
            onDelete: 'SET NULL',
            references: {
              model: 'Clients',
              key: 'id',
              as: 'clientId',
            },
          },
        },
        { transaction }
      );
      let salt = await generateSalt(10);
      let superUser = {
        firstName: 'Oxit',
        lastName: 'Admin',
        email: 'admin@oxit.com',
        userGroupId: 1,
        status: 'active',
        type: 'oxit',
        role: 'administrator',
        password: await encryptPassword('admin123', salt),
        timezone: 'UTC',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await queryInterface.bulkInsert('Users', [superUser], { transaction });
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
  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('Users', { transaction });
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
};
