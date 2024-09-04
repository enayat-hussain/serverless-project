const { UserGroups, Clients, Op, Users } = require('../../db/models');
const constants = require('../utils/constants');

const create = async ({ body, clientIdInHeader }) => {
  try {
    if (!body.clientId && clientIdInHeader) {
      body.clientId = clientIdInHeader;
    }
    const result = await UserGroups.create({
      name: body.name,
      status: body.status || constants.COMMON_STATUS.ACTIVE,
      permissions: body.permissions,
      clientId: body.clientId,
      platform: body.platform,
      default: body.default,
      type: body.type,
      role: body.role,
    });

    return {
      message: constants.MESSAGES.USER_GROUP_CREATED,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return { message: error.message, error: true };
  }
};

const update = async ({ body }) => {
  try {
    // Check User Group is present in db or not
    const userGroup = await UserGroups.findOne({
      where: {
        id: body.id,
        status: [constants.COMMON_STATUS.ACTIVE, constants.COMMON_STATUS.INACTIVE],
      },
    });

    if (!userGroup) {
      return {
        message: constants.MESSAGES.USER_GROUP_NOT_FOUND,
      };
    }

    const query = {
      where: {
        id: body.id,
      },
    };

    const result = await UserGroups.update(
      {
        name: body.name,
        status: body.status,
        permissions: body.permissions,
        clientId: body.clientId,
        displayName: body.displayName,
        visible: body.visible,
        platform: body.platform,
        default: body.default,
        dashboardTabs: body.dashboardTabs,
        type: body.type,
        role: body.role,
        allowedUserGroups: body.allowedUserGroups,
      },
      query
    );
    if (result && result[0] > 0) {
      return {
        message: constants.MESSAGES.USER_GROUP_UPDATED,
      };
    } else {
      return {
        message: constants.MESSAGES.USER_GROUP_NOT_FOUND,
      };
    }
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
      include: {
        model: Clients,
        as: 'Client',
        attributes: ['id', 'companyName'],
        where: {},
        required: false,
      },
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

    if (queryParams.companyName) {
      query.include.where.companyName = {
        [Op.iLike]: `%${queryParams.companyName}%`,
      };
      delete query.include.required;
    }

    if (clientIdInHeader) {
      clientId = clientIdInHeader;
    }

    if (queryParams.type) {
      query.where.type = queryParams.type;
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
    const { count: totalCount, rows: records } = await UserGroups.findAndCountAll(query);
    return {
      message: constants.MESSAGES.USER_GROUP_LIST,
      records,
      totalCount,
    };
  } catch (err) {
    return { message: err.message, error: true };
  }
};

const userGroupInfo = async ({ id }) => {
  try {
    const query = {
      where: {
        id,
      },
    };

    const result = await UserGroups.findOne(query);
    if (result) {
      return { message: constants.MESSAGES.USER_GROUP_DETAILS, data: result };
    } else {
      return {
        message: constants.MESSAGES.USER_GROUP_NOT_FOUND,
        error: true,
      };
    }
  } catch (error) {
    console.log(error);
    return { message: error.message, error: true };
  }
};

const deleteUserGroup = async ({ id }) => {
  try {
    let userGroup = await UserGroups.findOne({
      where: {
        id,
        status: [constants.COMMON_STATUS.ACTIVE, constants.COMMON_STATUS.INACTIVE],
      },
      include: {
        model: Users,
        as: 'Users',
        attributes: ['id', 'name', 'email'],
      },
    });
    userGroup = JSON.parse(JSON.stringify(userGroup));
    
    if (!userGroup) {
      return { message: constants.MESSAGES.USER_GROUP_NOT_FOUND };
    }
    if (userGroup?.Users.length > 0) {
      return { message: constants.MESSAGES.USER_GROUP_HAS_USER };
    }

    const result = await UserGroups.update(
      {
        status: constants.DELETED,
      },
      { where: { id } }
    );

    if (result > 0) {
      return { message: constants.MESSAGES.USER_GROUP_DELETED };
    } else {
      return {
        message: constants.MESSAGES.USER_GROUP_NOT_FOUND,
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
  userGroupInfo,
  deleteUserGroup,
};
