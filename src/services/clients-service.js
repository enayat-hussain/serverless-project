const { Clients } = require('../../db/models');
const constants = require('../utils/constants');

const create = async ({ body }) => {
  try {
    const result = await Clients.create({
      companyName: body.companyName,
      status: constants.userStatus.ACTIVE,
      projectName: body.projectName,
      companyLogo: body.companyLogo,
      address1: body.address1,
      address2: body.address2,
      city: body.city,
      state: body.state,
      zip: body.zip,
      country: body.country,
      latitude: body.latitude,
      longitude: body.longitude,
      stateCode: body.stateCode,
      shortCode: body.shortCode,
      slug: body.slug,
    });
    return { message: constants.CLIENT_MESSAGES.CLIENT_CREATED, result };
  } catch (error) {
    return { message: error.message, error: true };
  }
};

const list = async () => {
  try {
    const result = await Clients.findAll();
    return { message: constants.CLIENT_MESSAGES.CLIENT_LIST, result };
  } catch (error) {
    return { message: error.message, error: true };
  }
};
const clientInfo = async (id) => {
  try {
    const result = await Clients.findOne({ where: { id } });

    return { message: constants.CLIENT_MESSAGES.CLIENT_DETAILS, result };
  } catch (error) {
    return { message: error.message, error: true };
  }
};
const update = async ({ body }) => {
  const client = await Clients.findOne({ where: { id: body.id } });

  if (!client) {
    return { message: constants.CLIENT_MESSAGES.CLIENT_NOT_FOUND, error: true };
  }
  try {
    const result = Clients.update(
      {
        companyName: body.companyName,
        status: constants.userStatus.ACTIVE,
        projectName: body.projectName,
        companyLogo: body.companyLogo,
        address1: body.address1,
        address2: body.address2,
        city: body.city,
        state: body.state,
        zip: body.zip,
        country: body.country,
        atitude: body.atitude,
        longitude: body.longitude,
        latitude: body.latitude,
        stateCode: body.stateCode,
        shortCode: body.shortCode,
        slug: body.slug,
      },
      {
        where: {
          id: body.id,
        },
      }
    );
    return { message: constants.CLIENT_MESSAGES.CLIENT_UPDATED, result };
  } catch (error) {
    return { message: error.message, error: true };
  }
};

const disableEnableClient = async ({ body }) => {
  try {
    const result = await Clients.update({ status: body.status }, { where: { id: body.id } });

    return { message: constants.CLIENT_MESSAGES.CLIENT_UPDATED, result };
  } catch (error) {
    return { message: error.message, error: true };
  }
};
const deleteClient = async (id) => {
  try {
    const result = await Clients.destroy({ where: { id } });

    return { message: constants.CLIENT_MESSAGES.CLIENT_DELETED, result };
  } catch (error) {
    return { message: error.message, error: true };
  }
};
module.exports = {
  create,
  list,
  clientInfo,
  update,
  deleteClient,
  disableEnableClient,
};
