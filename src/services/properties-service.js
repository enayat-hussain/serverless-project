const { Properties, Clients, Op } = require('../../db/models');
const constants = require('../utils/constants');

const create = async ({ body, authorizedUser, clientIdInHeader }) => {
  try {
    if (!body.clientId && clientIdInHeader) {
      body.clientId = clientIdInHeader;
    }

    const result = await Properties.create({
      addressLine1: body.addressLine1,
      addressLine2: body.addressLine2,
      city: body.city,
      state: body.state,
      zip: body.zip,
      timezone: body.timezone,
      county: body.county,
      country: body.country,
      name: body.name,
      location: body.location,
      status: constants.COMMON_STATUS.ACTIVE,
      latitude: body.latitude,
      longitude: body.longitude,
      clientId: body.clientId,
      addedBy: authorizedUser.id,
      stateCode: body.stateCode,
      locationName: body.locationName,
      locationNumber: parseInt(body.locationNumber) ? parseInt(body.locationNumber) : null,
    });

    return {
      message: constants.MESSAGES.PROPERTY_CREATED,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return { message: error.message, error: true };
  }
};
const update = async ({ body, authorizedUser, clientIdInHeader }) => {
  try {
    const property = await Properties.findOne({
      where: {
        id: body.id,
        status: [constants.COMMON_STATUS.ACTIVE, constants.COMMON_STATUS.INACTIVE],
      },
    });

    if (!property) {
      return {
        message: constants.MESSAGES.PROPERTY_NOT_FOUND,
      };
    }
    const query = {
      where: {
        id: body.id,
      },
    };
    if (clientIdInHeader) {
      query.where.clientId = clientIdInHeader;
    }
    const result = await Properties.create({
      addressLine1: body.addressLine1,
      addressLine2: body.addressLine2,
      city: body.city,
      state: body.state,
      zip: body.zip,
      timezone: body.timezone,
      county: body.county,
      country: body.country,
      name: body.name,
      location: body.location,
      status: body.status || constants.COMMON_STATUS.ACTIVE,
      latitude: body.latitude,
      longitude: body.longitude,
      clientId: body.clientId,
      addedBy: authorizedUser.id,
      stateCode: body.stateCode,
      locationName: body.locationName,
      locationNumber: parseInt(body.locationNumber) ? parseInt(body.locationNumber) : null,
      type: body.type,
    });

    return {
      message: constants.MESSAGES.PROPERTY_UPDATED,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return { message: error.message, error: true };
  }
};

const list = async ({ queryParams, clientIdInHeader }) => {
  console.log('queryParams :', queryParams);
  const limit = parseInt(queryParams.count || constants.COUNT);
  const offset = parseInt(queryParams.offset || constants.OFFSET);

  try {
    const query = {
      where: {
        status: queryParams.status || constants.COMMON_STATUS.ACTIVE,
      },
      include: [
        {
          model: Clients,
          as: 'Client',
          attributes: ['id', 'companyName'],
          where: {},
          required: false,
        },
      ],
      order: [],
      limit,
      offset,
    };
    let clientId;

    if (queryParams.name) {
      query.where.name = {
        [Op.iLike]: `%${queryParams.name}%`,
      };
    }
    if (queryParams.addressLine1) {
      query.where.addressLine1 = {
        [Op.iLike]: `%${queryParams.addressLine1}%`,
      };
    }
    if (queryParams.addressLine2) {
      query.where.addressLine2 = {
        [Op.iLike]: `%${queryParams.addressLine2}%`,
      };
    }
    if (queryParams.locationName) {
      query.where.locationName = {
        [Op.iLike]: `%${queryParams.locationName}%`,
      };
    }
    if (queryParams.locationNumber) {
      query.where.locationNumber = {
        [Op.iLike]: `%${queryParams.locationNumber}%`,
      };
    }
    if (queryParams.state) {
      query.where.state = {
        [Op.iLike]: `%${queryParams.state}%`,
      };
    }
    if (queryParams.stateCode) {
      query.where.stateCode = {
        [Op.iLike]: `%${queryParams.stateCode}%`,
      };
    }
    if (queryParams.city) {
      query.where.city = {
        [Op.iLike]: `%${queryParams.city}%`,
      };
    }
    if (queryParams.country) {
      query.where.country = {
        [Op.iLike]: `%${queryParams.country}%`,
      };
    }
    if (queryParams.county) {
      query.where.county = {
        [Op.iLike]: `%${queryParams.county}%`,
      };
    }
    if (queryParams.type) {
      query.where.type = {
        [Op.iLike]: `%${queryParams.type}%`,
      };
    }

    if (queryParams.companyName) {
      query.include.where.companyName = {
        [Op.iLike]: `%${queryParams.companyName}%`,
      };
      delete query.include.required;
    }

    if (clientIdInHeader) {
      clientId = clientIdInHeader;
    }

    if (clientId) {
      query.where.clientId = clientId;
    }

    if (queryParams.sortColumn || queryParams.sortOrder) {
      if (!queryParams.sortColumn) {
        return {
          message: constants.MESSAGES.NO_SORT_COLUMN_PROVIDED,
          error: true,
        };
      }
      const sortOrder = queryParams.sortOrder;
      if (queryParams.sortColumn === 'companyName') {
        const clientOrder = [{ model: Clients, as: 'Client' }, queryParams.sortColumn, sortOrder || 'asc'];
        query.order.push(clientOrder);
      } else {
        query.order.push([queryParams.sortColumn, sortOrder || 'asc']);
      }
    }
    const { count: totalCount, rows: records } = await Properties.findAndCountAll(query);
    return {
      message: constants.MESSAGES.PROPERTY_LIST,
      records,
      totalCount,
    };
  } catch (err) {
    return { message: err.message, error: true };
  }
};
const propertyInfo = async ({ id }) => {
  try {
    const query = {
      where: {
        id,
      },
    };

    const result = await Properties.findOne(query);
    if (result) {
      return { message: constants.MESSAGES.PROPERTY_DETAILS, data: result };
    } else {
      return {
        message: constants.MESSAGES.PROPERTY_NOT_FOUND,
        error: true,
      };
    }
  } catch (error) {
    console.log(error);
    return { message: error.message, error: true };
  }
};

const deleteProperty = async ({ id }) => {
  try {
    let userGroup = await Properties.findOne({
      where: {
        id,
        status: [constants.COMMON_STATUS.ACTIVE, constants.COMMON_STATUS.INACTIVE],
      },
    });
    userGroup = JSON.parse(JSON.stringify(userGroup));

    if (!userGroup) {
      return { message: constants.MESSAGES.USER_GROUP_NOT_FOUND };
    }

    const result = await Properties.update(
      {
        status: constants.DELETED,
      },
      { where: { id } }
    );

    if (result > 0) {
      return { message: constants.MESSAGES.PROPERTY_DELETED };
    } else {
      return {
        message: constants.MESSAGES.PROPERTY_NOT_FOUND,
      };
    }
  } catch (error) {
    console.log(error);
    return { message: error.message, error: true };
  }
};
module.exports = {
  create,
  update,
  list,
  propertyInfo,
  deleteProperty,
};
