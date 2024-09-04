const { Clients } = require('../../db/models');
const constants = require('./constants');

const verifyClientId = async (clientId) => {
  const result = await Clients.findOne({
    where: {
      id: clientId,
    },
  });
  return !!result;
};
const getClientDetails = async (relationName, relationValue) => {
  const result = await Clients.findOne({
    where: {
      [relationName]: relationValue,
    },
  });
  return result || false;
};
const checkNDSClient = async (clientId) =>
  parseInt(clientId) === parseInt((await getClientDetails('slug', constants.SLUGNAME.NDS)).id);
module.exports = {
  verifyClientId,
};
