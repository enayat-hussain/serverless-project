'use strict';
const statesData = require('./seed-data/states-data');
module.exports = {
  up: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query('DELETE FROM "States"', {
        transaction,
      });
      await queryInterface.bulkInsert('States', statesData, { transaction });
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
    return queryInterface.bulkDelete('States', statesData);
  },
};
