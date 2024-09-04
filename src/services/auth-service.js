const { Users, UserGroups, Clients } = require('../../db/models');
const constants = require('../utils/constants');
const { sendMail } = require('../utils/mail-service');
const utils = require('../utils/utils');

module.exports = {
  login: async (body) => {
    try {
      const attributes = {
        exclude: ['createdAt', 'updatedAt'],
      };
      const query = {
        where: {
          email: body.email,
          status: constants.STATUS.ACTIVE,
        },
        include: [
          {
            model: UserGroups,
            as: 'UserGroup',
            include: [
              {
                model: Clients,
                as: 'Client',
              },
            ],
          },
        ],
        attributes,
      };
      const user = await Users.findOne(query);
      if (!user) {
        return { message: constants.USER.USER_NOT_EXIST, error: true };
      }
      const isValid = await utils.validatePassword(body.password, user.password);
      if (!isValid) {
        return { message: constants.USER.INVALID_PASSWORD, error: true };
      }
      const tokenPayload = {
        uid: user.id,
      };
      const userResponse = user.dataValues;
      delete userResponse.password;
      const token = utils.generateJWTToken(tokenPayload);
      return { token, user: userResponse };
    } catch (error) {
      console.log(error);
      return { message: error.message, error: true };
    }
  },
  forgotPassword: async (email) => {
    try {
      const exists = await Users.findOne({
        where: {
          email: email,
        },
      });

      if (!exists) {
        return { message: constants.MESSAGES.USER_NOT_EXISTS_ID, error: true };
      }
      const otp = Math.floor(100000 + Math.random() * 900000);

      const subject = 'OTP for password';
      const body = `Your OTP for reset password id: ${otp}`;
      const html = body;
      await sendMail(email, subject, body, html, [], []);

      await Users.update(
        { passCode: otp },
        {
          where: {
            id: exists.id,
          },
        }
      );
      return { message: 'Otp Sent Successfully' };
    } catch (error) {
      console.log(error);
      return { message: error.message, error: true };
    }
  },
  forgotPasswordConfirm: async (body) => {
    try {
      const exists = await Users.findOne({
        where: {
          email: body.email,
          passCode: body.otp,
        },
      });

      if (!exists) {
        return { message: constants.MESSAGES.USER_NOT_EXISTS_ID };
      }
      const salt = await utils.generateSalt(8);
      const encrypted = await utils.encryptPassword(body.password, salt);
      await Users.update(
        { password: encrypted },
        {
          where: {
            id: exists.id,
          },
        }
      );
      return { message: 'Password Reset Successful' };
    } catch (error) {
      console.log(error);
      return { message: error.message, error: true };
    }
  },
};
