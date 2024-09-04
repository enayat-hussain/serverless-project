'use strict';
const OrganizationalSettingsData = require('./seed-data/organizational-settings-data');
module.exports = {
  up: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query('DELETE FROM "OrganizationalSettings"', {
        transaction,
      });
      await queryInterface.bulkInsert('OrganizationalSettings', OrganizationalSettingsData, {
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

  down: (queryInterface) => {
    return queryInterface.bulkDelete('OrganizationalSettings', OrganizationalSettingsData);
  },
};
