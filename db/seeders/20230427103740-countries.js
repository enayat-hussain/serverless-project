'use strict';
const CountriesData = require('./seed-data/countries-data');

module.exports = {
  up: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query('DELETE FROM "Countries"', {
        transaction,
      });
      await queryInterface.bulkInsert('Countries', CountriesData, {
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
    return queryInterface.bulkDelete('Countries', CountriesData);
  },
};
