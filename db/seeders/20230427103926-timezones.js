'use strict';
const TimezonesData = require('./seed-data/timezones-data');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query('DELETE FROM "Timezones"', {
        transaction,
      });
      await queryInterface.bulkInsert('Timezones', TimezonesData, {
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Timezones', TimezonesData);
  },
};
