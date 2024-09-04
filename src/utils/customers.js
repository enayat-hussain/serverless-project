const { Customers, Users } = require('../../db/models');
const { parseResult } = require('./utils');

const checkExistCustomer = async ({ companyName, clientId }) => {
  console.log('companyName :', companyName);
  const result = await Customers.findOne({
    where: {
      companyName,
      clientId,
    },
  });
  if (result && result.id) {
    return true;
  } else {
    return false;
  }
};
const checkExistCustomerById = async ({ id }) => {
  const result = await Customers.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Users,
        as: 'User',
      },
    ],
  });
  return parseResult(result);
};
module.exports = {
  checkExistCustomer,
  checkExistCustomerById,
};
