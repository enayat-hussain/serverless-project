'use strict';
const citiesData = require('./seed-data/cities-data');
module.exports = {
  up: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query('DELETE FROM "Cities"', {
        transaction,
      });
      await queryInterface.bulkInsert('Cities', citiesData, { transaction });
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
    return queryInterface.bulkDelete('Cities', citiesData);
  },
};
