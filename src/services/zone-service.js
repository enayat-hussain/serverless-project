const { Zones, Clients, Users } = require('../../db/models');
const constants = require('../utils/constants');

const create = async ({ body, clientId }) => {
  if (!body.clientId && clientId) {
    body.clientId = clientId;
  }
  try {
    const result = await Zones.create({
      name: body.name,
      clientId: body.clientId,
      addedBy: body.addedBy,
      status: constants.ZONE_STATUS.ACTIVE,
    });
    return { message: constants.MESSAGES.ZONE_CREATED, data: result };
  } catch (error) {
    return { message: error.message, error: true };
  }
};
const zoneInfo = async (id) => {
  try {
    const result = await Zones.findOne({
      where: { id },
      include: [
        {
          model: Clients,
          as: 'client',
          attributes: ['id', 'companyName'],
        },
        {
          model: Users,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });
    return { message: constants.ZONE_MESSAGES.ZONE_DETAILS, result };
  } catch (error) {
    return { message: error.message, error: true };
  }
};
const list = async () => {
  try {
    const result = await Zones.findAll({
      where: {
        status: constants.ZONE_STATUS.ACTIVE,
      },
      include: [
        {
          model: Clients,
          as: 'client',
          attributes: ['id', 'companyName'],
        },
        {
          model: Users,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });
    return result;
  } catch (error) {
    return { message: error.message, error: true };
  }
};
const update = async ({ body, clientId }) => {
  if (!body.clientId && clientId) {
    body.clientId = clientId;
  }
  try {
    const zone = Zones.findOne({
      where: {
        id: body.id,
        status: [constants.ZONE_STATUS.ACTIVE, constants.ZONE_STATUS.INACTIVE],
      },
    });

    if (!zone) {
      return { message: constants.ZONE_MESSAGES.ZONE_DATA_NOT_PROVIDED };
    }

    const result = Zones.update(
      { name: body.name, status: body.status },
      { where: { id: body.id } }
    );

    return { message: constants.ZONE_MESSAGES.ZONE_UPDATED, result };
  } catch (error) {
    return { message: error.message, error: true };
  }
};
const deleteZone = async (id) => {
  try {
    const result = await Zones.update({ status: constants.ZONE_STATUS.DELETED }, { where: { id } });

    return { message: constants.ZONE_MESSAGES.ZONE_DELETED, result };
  } catch (error) {
    return { message: error.message, error: true };
  }
};
module.exports = {
  create,
  update,
  zoneInfo,
  list,
  deleteZone,
};
