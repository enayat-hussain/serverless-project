const { Customers, sequelize, Op, Users } = require('../../db/models');
const constants = require('../utils/constants');
const { checkExistCustomer, checkExistCustomerById } = require('../utils/customers');
const { sendMail } = require('../utils/mail-service');
const { checkExistUser } = require('../utils/user');
const userService = require('./user-service');

const create = async ({ body, clientIdInHeader, authorizedUser }) => {
  let transaction = await sequelize.transaction();

  try {
    if (!body.clientId && clientIdInHeader) {
      body.clientId = clientIdInHeader;
    }
    const customerExist = await checkExistCustomer({
      companyName: body.companyName,
      clientId: body.clientId,
    });
    if (customerExist) {
      return { message: constants.MESSAGES.CUSTOMER_COMPANY_ALREADY_EXIST, error: true };
    }
    const userExist = await checkExistUser(body.ownerAccountEmail);
    let userResponse;
    if (!userExist) {
      userResponse = await userService.create({
        body: {
          type: constants.USER_TYPE.CUSTOMER,
          role: constants.USER_ROLE.OWNER,
          email: body.ownerAccountEmail,
          status: constants.userStatus.ACTIVE,
          firstName: body.ownerFirstName,
          lastName: body.ownerLastName,
          phoneNumber: body.ownerPhoneNumber,
          phoneCountryCode: body.ownerPhoneCountryCode,
          clientId: body.clientId,
        },
        clientIdInHeader,
        authorizedUser,
        transaction,
        returnExistData: true,
      });
    } else {
      userResponse = await userService.update({
        body: {
          ...userExist,
          status: constants.userStatus.ACTIVE,
          firstName: body.ownerFirstName,
          lastName: body.ownerLastName,
          phoneNumber: body.ownerPhoneNumber,
          phoneCountryCode: body.ownerPhoneCountryCode,
        },
        clientIdInHeader,
        authorizedUser,
        transaction,
      });
    }
    if (userResponse.error && !userResponse.data) {
      return { message: userResponse.message, error: true };
    }
    await Customers.create(
      {
        companyName: body.companyName,
        status: body.status || constants.COMMON_STATUS.ACTIVE,
        companyAddress: body.companyAddress,
        clientId: body.clientId,
        ownerId: userExist?.id || userResponse.data.id,
      },
      { transaction }
    );
    transaction.commit();
    return {
      message: constants.MESSAGES.CUSTOMER_CREATED,
    };
  } catch (error) {
    console.log(error);
    transaction.rollback();
    return { message: error.message, error: true };
  }
};
const update = async ({ body, clientIdInHeader, authorizedUser }) => {
  let transaction = await sequelize.transaction();

  try {
    if (!body.clientId && clientIdInHeader) {
      body.clientId = clientIdInHeader;
    }
    const customerExist = await checkExistCustomerById({
      id: body.id,
    });
    console.log('customerExist :', customerExist);
    if (!customerExist) {
      return { message: constants.MESSAGES.CUSTOMER_NOT_FOUND, error: true };
    }
    const userResponse = await userService.update({
      body: {
        ...customerExist.User,
        status: constants.userStatus.ACTIVE,
        firstName: body.ownerFirstName,
        lastName: body.ownerLastName,
        phoneNumber: body.ownerPhoneNumber,
        phoneCountryCode: body.ownerPhoneCountryCode,
      },
      clientIdInHeader,
      authorizedUser,
      transaction,
    });
    if (userResponse.error) {
      return { message: userResponse.message, error: true };
    }
    await Customers.update(
      {
        companyName: body.companyName,
        status: body.status || constants.COMMON_STATUS.ACTIVE,
        companyAddress: body.companyAddress,
        clientId: body.clientId,
      },
      {
        where: {
          id: customerExist.id,
        },
      },
      { transaction }
    );
    transaction.commit();
    return {
      message: constants.MESSAGES.CUSTOMER_UPDATED,
    };
  } catch (error) {
    console.log(error);
    transaction.rollback();
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
        model: Users,
        as: 'User',
        attributes: ['id', 'name', 'email', 'firstName', 'lastName', 'phoneNumber', 'phoneCountryCode'],
        where: {},
        required: true,
      },
      order: [],
      limit,
      offset,
    };
    let clientId;

    if (queryParams.companyName) {
      query.where.companyName = {
        [Op.iLike]: `%${queryParams.companyName}%`,
      };
    }
    if (queryParams.companyAddress) {
      query.where.companyAddress = {
        [Op.iLike]: `%${queryParams.companyAddress}%`,
      };
    }
    if (queryParams.ownerAccountEmail) {
      query.include.where.email = {
        [Op.iLike]: `%${queryParams.ownerAccountEmail}%`,
      };
    }
    if (queryParams.ownerFirstName) {
      query.include.where.firstName = {
        [Op.iLike]: `%${queryParams.ownerFirstName}%`,
      };
    }
    if (queryParams.ownerLastName) {
      query.include.where.lastName = {
        [Op.iLike]: `%${queryParams.ownerLastName}%`,
      };
    }
    if (queryParams.ownerName) {
      const queryClause = queryParams.ownerName.split(' ');
      query.include.where.firstName = {
        [Op.iLike]: `%${queryClause[0]}%`,
      };
      if (queryClause.length > 1) {
        query.include.where.lastName = {
          [Op.iLike]: `%${queryClause[1]}%`,
        };
      }
    }
    if (queryParams.ownerPhoneNumber) {
      query.include.where.phoneNumber = {
        [Op.iLike]: `%${queryParams.ownerPhoneNumber}%`,
      };
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
      if (queryParams.sortColumn === 'ownerAccountEmail') {
        const customerOrder = [{ model: Users, as: 'User' }, 'email', sortOrder || 'asc'];
        query.order.push(customerOrder);
      } else if (queryParams.sortColumn === 'ownerName') {
        const customerOrder = [{ model: Users, as: 'User' }, 'firstName', sortOrder || 'asc'];
        query.order.push(customerOrder);
      } else {
        query.order.push([queryParams.sortColumn, sortOrder || 'asc']);
      }
    }
    const { count: totalCount, rows: records } = await Customers.findAndCountAll(query);
    return {
      message: constants.MESSAGES.CUSTOMER_LIST,
      records,
      totalCount,
    };
  } catch (err) {
    return { message: err.message, error: true };
  }
};

const customerInfo = async ({ id }) => {
  try {
    const query = {
      where: {
        id,
        status: [constants.COMMON_STATUS.ACTIVE],
      },
    };

    const result = await Customers.findOne(query);
    if (result) {
      return { message: constants.MESSAGES.CUSTOMER_DETAILS, data: result };
    } else {
      return {
        message: constants.MESSAGES.CUSTOMER_NOT_FOUND,
        error: true,
      };
    }
  } catch (error) {
    console.log(error);
    return { message: error.message, error: true };
  }
};

const deleteCustomer = async ({ id }) => {
  try {
    let customer = await Customers.findOne({
      where: {
        id,
        status: [constants.COMMON_STATUS.ACTIVE, constants.COMMON_STATUS.INACTIVE],
      },
      raw: true,
    });

    if (!customer) {
      return { message: constants.MESSAGES.CUSTOMER_NOT_FOUND };
    }
    if (customer?.Users.length > 0) {
      return { message: constants.MESSAGES.CUSTOMER_DELETED };
    }

    const result = await Customers.update(
      {
        status: constants.DELETED,
      },
      { where: { id } }
    );

    if (result > 0) {
      return { message: constants.MESSAGES.CUSTOMER_DELETED };
    } else {
      return {
        message: constants.MESSAGES.CUSTOMER_NOT_FOUND,
      };
    }
  } catch (error) {
    console.log(error);
    return { message: error.message, error: true };
  }
};
const sendOtp = async ({ authorizedUser }) => {
  try {
    let customer = await Customers.findOne({
      where: {
        status: [constants.COMMON_STATUS.ACTIVE],
        ownerId: authorizedUser.id,
      },
      raw: true,
    });

    if (!customer) {
      return { message: constants.MESSAGES.CUSTOMER_NOT_FOUND };
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const result = await Customers.update(
      {
        otp,
      },
      { where: { id: customer.id } }
    );

    const subject = 'Transfer Ownership OTP';
    const emailBody = `
          Dear User,<br/>
          Use below OTP of to transfer OwnerShip <br/><br/>
          ${otp} <br/><br/>
          Thank you,<br/>
          Oxit Team
        `;
    await sendMail(authorizedUser.email, subject, emailBody, emailBody);
    if (result[0] > 0) {
      return { message: constants.MESSAGES.CUSTOMER_OTP_SENT };
    } else {
      return {
        message: constants.MESSAGES.CUSTOMER_NOT_FOUND,
      };
    }
  } catch (error) {
    console.log(error);
    return { message: error.message, error: true };
  }
};

const transferOwnership = async ({ body, authorizedUser }) => {
  try {
    const owner = await Users.findOne({
      where: {
        id: authorizedUser.id,
        status: constants.COMMON_STATUS.ACTIVE,
      },
    });
    if (!owner || owner.role !== constants.USER_ROLE.OWNER || owner.type !== constants.USER_TYPE.CUSTOMER) {
      return { message: constants.MESSAGES.OWNER_NOT_FOUND, error: true };
    }
    const newOwner = await Users.findOne({
      where: {
        id: body.newOwnerId,
        status: constants.userStatus.ACTIVE,
      },
    });
    if (newOwner && newOwner.role === constants.USER_ROLE.ADMIN && newOwner.type === constants.USER_TYPE.CUSTOMER) {
      const checkCustomer = await Customers.findOne({
        where: {
          otp: body.otp,
          ownerId: owner.id,
        },
      });
      if (checkCustomer) {
        await Customers.update(
          {
            ownerId: newOwner.id,
          },
          {
            where: {
              id: checkCustomer.id,
            },
          }
        );
        newOwner.role = constants.USER_ROLE.OWNER;
        await newOwner.save();
        owner.role = constants.USER_ROLE.ADMIN;
        await owner.save();
        const subject = 'Transfer Ownership';
        const emailBody = `
          Dear User,<br/>
          You have successfully transfer your ownership. Now you are a user type of Customer<br/><br/>
          Thank you,<br/>
          Oxit Team
        `;
        await sendMail(authorizedUser.email, subject, emailBody, emailBody);
        return { message: constants.MESSAGES.COMPANY_OWNER_TRANSFERRED };
      } else {
        return { message: constants.MESSAGES.CUSTOMER_OTP_VERIFICATION_FAILED, error: true };
      }
    } else {
      return { message: constants.MESSAGES.USER_NOT_FOUND, error: true };
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
  customerInfo,
  deleteCustomer,
  sendOtp,
  transferOwnership,
};
