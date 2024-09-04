const { Users, UserGroups, Clients } = require('../../db/models');
const { MESSAGES } = require('../utils/constants');
const responseDispatcher = require('../utils/response-dispatcher');
const { decodeJWTToken } = require('../utils/utils');
module.exports.authorize = async (req, res, next) => {
  const { authorization, Authorization } = req.headers;
  const token = authorization || Authorization;
  if (!token) {
    return responseDispatcher.dispatchError(res, MESSAGES.UNAUTHORIZED);
  }
  try {
    const jwtToken = token.split('Bearer ')[1];
    const payload = decodeJWTToken(jwtToken);

    res.user = payload;
    const query = {
      where: {
        id: payload.uid,
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
      attributes: { exclude: ['password'] },
    };
    const user = await Users.findOne(query);
    if (user) {
      req.user = user.dataValues;
      return next();
    }
    return responseDispatcher.dispatchError(res, MESSAGES.UNAUTHORIZED);
  } catch (error) {
    console.log(error);
    responseDispatcher.dispatchError(res, error.message);
  }
};
