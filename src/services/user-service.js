const bullQueue = require('../utils/bull-queue');
const { Users, UserGroups, Clients, Op, Sequelize } = require('../../db/models');
const { verifyClientId } = require('../utils/clients');
const constants = require('../utils/constants');
const { sendMail } = require('../utils/mail-service');
const { checkExistUser } = require('../utils/user');
const { readHTMLFile } = require('../utils/utils');
const Handlebars = require('handlebars');
const path = require('path');

const create = async ({ body, authorizedUser, clientIdInHeader, transaction, returnExistData }) => {
  try {
    const clientId = body.clientId;
    const userExist = await checkExistUser(body.email);
    if (userExist) {
      return { message: 'User Already Exist', error: true, ...(returnExistData ? { data: userExist } : {}) };
    }
    if (body.type !== constants.USER_TYPE.OXIT) {
      const checkClient = await verifyClientId(clientId || clientIdInHeader);
      if (!checkClient) {
        return {
          Message: constants.MESSAGES.CLIENT_NOT_FOUND,
        };
      }
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const result = await Users.create(
      {
        type: body.type,
        role: body.role,
        email: body.email || '',
        status: constants.userStatus.ACTIVE,
        clientId,
        firstName: body.firstName,
        lastName: body.lastName,
        profileImage: body.profileImage,
        phoneNumber: body.phoneNumber,
        isPhoneVerified: 'false',
        phoneCountryCode: body.phoneCountryCode,
        pushNotificationSetting: constants.defaultNotificationSettings.PUSH,
        emailNotificationSetting: constants.defaultNotificationSettings.EMAIL,
        smsNotificationSetting: constants.defaultNotificationSettings.SMS,
        createdBy: authorizedUser ? authorizedUser.id : null,
        timezone: body.timezone,
        userGroupId: body.userGroupId,
        projectId: body.projectId,
        emailNotificationPreferences: body.emailNotificationPreferences,
        passCode: otp,
      },
      { transaction }
    );
    await sendInvitationMessage(result);
    return { message: constants.MESSAGES.USER_CREATED, data: result };
  } catch (error) {
    console.log(error);
    return { message: error.message, error: true };
  }
};
const bulkCreate = async ({ body, authorizedUser, clientIdInHeader }) => {
  // extract user emails
  const userEmails = [];
  body.forEach((user) => {
    if (user.email) userEmails.push(user.email);
  });

  try {
    const clientId = body.clientId;

    // check for existing user
    const userExist = await Users.findAll({
      where: {
        email: {
          [Op.in]: userEmails,
        },
      },
    });
    console.log('user exist', userExist, userEmails);
    if (userExist.length > 0) {
      return { message: 'One of the Users Already Exist', error: true };
    }

    if (body.type !== constants.USER_TYPE.OXIT) {
      const checkClient = await verifyClientId(clientId || clientIdInHeader);
      if (!checkClient) {
        return {
          message: constants.MESSAGES.CLIENT_NOT_FOUND,
        };
      }
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    // Bulk Creation
    const result = await Users.bulkCreate(
      body.map((user) => ({
        type: user.type,
        role: user.role,
        email: user.email || '',
        status: constants.userStatus.ACTIVE,
        clientId,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage,
        phoneNumber: user.phoneNumber,
        isPhoneVerified: 'false',
        phoneCountryCode: user.phoneCountryCode,
        pushNotificationSetting: constants.defaultNotificationSettings.PUSH,
        emailNotificationSetting: constants.defaultNotificationSettings.EMAIL,
        smsNotificationSetting: constants.defaultNotificationSettings.SMS,
        createdBy: authorizedUser ? authorizedUser.id : null,
        timezone: user.timezone,
        userGroupId: user.userGroupId,
        projectId: user.projectId,
        emailNotificationPreferences: user.emailNotificationPreferences,
        passCode: otp,
      }))
    );

    // Send Invitation Messages
    await sendInvitationMessageToBulkUsers(result);

    return { message: constants.MESSAGES.USER_CREATED, result };
  } catch (error) {
    console.error(error);
    return { message: error.message, error: true };
  }
};

const update = async ({ body, authorizedUser, clientIdInHeader }) => {
  try {
    const clientId = body.clientId;

    if (body.type !== constants.USER_TYPE.OXIT) {
      const checkClient = await verifyClientId(clientId || clientIdInHeader);
      if (!checkClient) {
        return {
          Message: constants.MESSAGES.CLIENT_NOT_FOUND,
        };
      }
    }
    const query = {
      where: {
        id: body.id,
      },
    };
    const result = await Users.update(
      {
        type: body.type,
        role: body.role,
        email: body.email || '',
        status: constants.userStatus.ACTIVE,
        clientId,
        firstName: body.firstName,
        lastName: body.lastName,
        profileImage: body.profileImage,
        phoneNumber: body.phoneNumber,
        isPhoneVerified: 'false',
        phoneCountryCode: body.phoneCountryCode,
        pushNotificationSetting:
          'pushNotificationSetting' in body ? body.pushNotificationSetting : constants.defaultNotificationSettings.PUSH,
        emailNotificationSetting:
          'emailNotificationSetting' in body
            ? body.emailNotificationSetting
            : constants.defaultNotificationSettings.EMAIL,
        smsNotificationSetting:
          'smsNotificationSetting' in body ? body.smsNotificationSetting : constants.defaultNotificationSettings.SMS,
        createdBy: authorizedUser ? authorizedUser.id : null,
        timezone: body.timezone,
        userGroupId: body.userGroupId,
        projectId: body.projectId,
        emailNotificationPreferences: body.emailNotificationPreferences,
      },
      query
    );
    return {
      message: result && result[0] > 0 ? constants.MESSAGES.USER_UPDATED : constants.MESSAGES.USER_NOT_FOUND,
    };
  } catch (error) {
    console.log(error);
    return { message: error.message, error: true };
  }
};
const bulkUpdate = async ({ body, authorizedUser, clientIdInHeader }) => {
  // extract user ids
  const userIds = [];
  body.forEach((user) => {
    if (user.id) userIds.push(user.id);
  });

  try {
    const clientId = body.clientId;

    // check for existing user
    const userExist = await Users.findAll({
      where: {
        id: {
          [Op.in]: userIds,
        },
      },
    });
    if (userExist.length !== userIds.length) {
      return { message: 'One of the Users Not Found', error: true };
    }

    if (body.type !== constants.USER_TYPE.OXIT) {
      const checkClient = await verifyClientId(clientId || clientIdInHeader);
      if (!checkClient) {
        return {
          message: constants.MESSAGES.CLIENT_NOT_FOUND,
        };
      }
    }
    // Bulk Update
    const updatedUsers = body.map((user) => ({
      type: user.type,
      role: user.role,
      email: user.email || '',
      status: constants.userStatus.ACTIVE,
      clientId,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImage: user.profileImage,
      phoneNumber: user.phoneNumber,
      isPhoneVerified: 'false',
      phoneCountryCode: user.phoneCountryCode,
      pushNotificationSetting:
        'pushNotificationSetting' in user ? user.pushNotificationSetting : constants.defaultNotificationSettings.PUSH,
      emailNotificationSetting:
        'emailNotificationSetting' in user
          ? user.emailNotificationSetting
          : constants.defaultNotificationSettings.EMAIL,
      smsNotificationSetting:
        'smsNotificationSetting' in user ? user.smsNotificationSetting : constants.defaultNotificationSettings.SMS,
      createdBy: authorizedUser ? authorizedUser.id : null,
      timezone: user.timezone,
      userGroupId: user.userGroupId,
      projectId: user.projectId,
      emailNotificationPreferences: user.emailNotificationPreferences,
    }));

    await Promise.all(
      updatedUsers.map(async (user) => {
        await Users.update(user, { where: { id: { [Op.in]: userIds } } });
      })
    );

    // console.log(result, 'result');
    return { message: constants.MESSAGES.USER_UPDATED };
  } catch (error) {
    console.error(error);
    return { message: error.message, error: true };
  }
};
const deleteUser = async ({ body }) => {
  try {
    const query = {
      where: {
        id: {
          [Op.in]: body.ids,
        },
      },
    };
    //TODO: add flow to delete associated record to user
    await Users.destroy(query);
    return {
      message: constants.MESSAGES.USERS_DELETED,
    };
  } catch (error) {
    console.log(error);
    return { message: error.message, error: true };
  }
};
const bulkDelete = async ({ body }) => {
  // extract user ids
  const userIds = [];
  body.forEach((user) => {
    if (user.id) userIds.push(user.id);
  });

  try {
    const result = await Users.destroy({ where: { id: { [Op.in]: userIds } } });
    return { message: constants.MESSAGES.USERS_DELETED, result };
  } catch (error) {
    console.error(error);
    return { message: error.message, error: true };
  }
};
const list = async ({ queryParams, clientIdInHeader }) => {
  console.log('queryParams :', queryParams);
  try {
    const client = {
      model: Clients,
      where: {},
      as: 'Client',
      required: false,
    };
    const userGroup = {
      model: UserGroups,
      where: {},
      as: 'UserGroup',
      required: false,
      include: [client],
    };
    const queryObj = {
      limit: Number(queryParams.count) || 10,
      offset: Number(queryParams.offset) || 0,
      order: [],
      attributes: {
        exclude: ['password'],
      },
      where: {
        status: 'active',
      },
      include: [userGroup],
    };
    if (queryParams.role) {
      userGroup.where.id = {
        [Op.in]: (queryParams.role || '').split(','),
      };
    }
    if (clientIdInHeader) {
      queryObj.where.clientId = clientIdInHeader;
    }
    if (queryParams.id) {
      queryObj.where.id = queryParams.id;
    }

    if (queryParams.firstName) {
      queryObj.where.firstName = {
        [Op.iLike]: `%${queryParams.firstName}%`,
      };
    }
    if (queryParams.lastName) {
      queryObj.where.lastName = {
        [Op.iLike]: `%${queryParams.lastName}%`,
      };
    }
    if (queryParams.name) {
      const queryClause = queryParams.name.split(' ');
      queryObj.where.firstName = {
        [Op.iLike]: `%${queryClause[0]}%`,
      };
      if (queryClause.length > 1) {
        queryObj.where.lastName = {
          [Op.iLike]: `%${queryClause[1]}%`,
        };
      }
    }
    if (queryParams.email) {
      queryObj.where.email = {
        [Op.iLike]: `%${queryParams.email}%`,
      };
    }
    if (queryParams.userGroupName) {
      userGroup.where.name = {
        [Op.iLike]: `%${queryParams.userGroupName}%`,
      };
    }
    if (queryParams.userGroupType) {
      userGroup.where.type = {
        [Op.in]: (queryParams.userGroupType || '').split(','),
      };
    }
    if (queryParams.userGroupRole) {
      userGroup.where.role = {
        [Op.in]: (queryParams.userGroupRole || '').split(','),
      };
    }

    if (queryParams.companyName) {
      client.where.companyName = {
        [Op.iLike]: `%${queryParams.companyName}%`,
      };
    }

    if (queryParams.projectName) {
      client.where.projectName = {
        [Op.iLike]: `%${queryParams.projectName}%`,
      };
    }

    if (queryParams.sortColumn === 'userGroupName') {
      queryObj.order.push([Sequelize.literal(`"UserGroup"."name" ${queryParams.sortOrder || 'asc'}`)]);
    } else if (queryParams.sortColumn === 'companyName' || queryParams.sortColumn === 'projectName') {
      queryObj.order.push([Sequelize.literal(`"UserGroup->Client"."companyName" ${queryParams.sortOrder || 'asc'}`)]);
    } else if (queryParams.sortColumn === 'name') {
      queryObj.order.push(['firstName', queryParams.sortOrder || 'asc']);
    } else {
      queryObj.order.push([queryParams.sortColumn || 'id', queryParams.sortOrder || 'asc']);
    }

    let { rows, count } = await Users.findAndCountAll(queryObj);
    return { rows, count };
  } catch (error) {
    console.log(error);
    return { message: error.message, error: true };
  }
};
const userInfo = async ({ userId }) => {
  try {
    const client = {
      model: Clients,
      as: 'Client',
    };
    const userGroup = {
      model: UserGroups,
      as: 'UserGroup',
      include: [client],
    };

    let user = await Users.findOne({
      where: {
        id: Number(userId),
        status: constants.userStatus.ACTIVE,
      },
      include: [userGroup],
    });
    return { data: user };
  } catch (error) {
    console.log(error);
    return { message: error.message, error: true };
  }
};
const enableDisableUser = async ({ body, status }) => {
  await Users.update(
    {
      status,
    },
    {
      where: {
        id: {
          [Op.in]: body.ids,
        },
      },
    }
  );
  let message = constants.MESSAGES.USERS_ENABLED;
  if (status === constants.userStatus.INACTIVE) {
    message = constants.MESSAGES.USERS_DISABLED;
  }
  return {
    message,
  };
};
const userVerify = async ({ body }) => {
  const where = {
    email: body.email,
    passCode: body.otp,
  };
  const user = await Users.findOne({
    where,
    raw: true,
  });
  if (!user) {
    return { message: constants.MESSAGES.USER_NOT_FOUND };
  }
  if (!user.isEmailVerified) {
    Users.update(
      { isEmailVerified: true },
      {
        where,
      }
    );
    return {
      message: constants.MESSAGES.USER_VERIFIED,
      firstTimeUser: true,
    };
  } else {
    return {
      message: constants.MESSAGES.USER_ALREADY_VERIFIED,
    };
  }
};
const resendInvitation = async ({ userId }) => {
  const where = {
    id: Number(userId),
  };
  const user = await Users.findOne({
    where,
    raw: true,
  });
  if (!user) {
    return { message: constants.MESSAGES.USER_NOT_FOUND };
  }
  await sendInvitationMessage(user);
  return { message: constants.MESSAGES.RESEND_USER_INVITATION };
};
const sendInvitationMessage = async (user) => {
  let email = {
    emailSubject: '',
    emailMessage: '',
  };
  //TODO: make urls object client-wise after client module done
  const urls = {
    portalUrl: 'https://portal-dev.oxtech.com/',
    clientName: 'Oxit',
    companyLogo: constants.BASE_LOGO_URL,
  };
  const loginUrl =
    urls.portalUrl +
    constants.LOGIN +
    '?username=' +
    encodeURIComponent(user.email) +
    '&otp=' +
    encodeURIComponent(user.passCode);
  email.emailSubject = `Welcome to Dev Portal!`;

  let htmlToSend;
  const file_path = path.join(__dirname, '../assets/mail/InviteUser.html');
  const html = await readHTMLFile(file_path);
  const template = Handlebars.compile(html);
  const replacements = {
    companyLogo: urls.companyLogo,
    clientName: urls.clientName,
    loginUrl: loginUrl,
    username: user.email,
  };
  htmlToSend = template(replacements);
  await sendMail(user.email, email.emailSubject, email.emailSubject, htmlToSend, []);
};
const sendInvitationMessageToBulkUsers = async (users) => {
  const urls = {
    portalUrl: 'https://portal-dev.oxtech.com/',
    clientName: 'Oxit',
    companyLogo: constants.BASE_LOGO_URL,
  };

  for (const user of users) {
    const email = {
      emailSubject: `Welcome to Dev Portal!`,
      emailMessage: '',
    };

    const loginUrl =
      urls.portalUrl +
      constants.LOGIN +
      '?username=' +
      encodeURIComponent(user.email) +
      '&otp=' +
      encodeURIComponent(user.passCode);

    let htmlToSend;
    const file_path = path.join(__dirname, '../assets/mail/InviteUser.html');
    const html = await readHTMLFile(file_path);
    const template = Handlebars.compile(html);
    const replacements = {
      companyLogo: urls.companyLogo,
      clientName: urls.clientName,
      loginUrl: loginUrl,
      username: user.email,
    };
    htmlToSend = template(replacements);

    // Enqueue the task for each user using Bull
    await bullQueue.add('sendMail', sendMail(user.email, email.emailSubject, email.emailSubject, htmlToSend, []));
  }
};

module.exports = {
  create,
  bulkCreate,
  update,
  bulkUpdate,
  list,
  enableDisableUser,
  deleteUser,
  bulkDelete,
  userInfo,
  userVerify,
  resendInvitation,
};
