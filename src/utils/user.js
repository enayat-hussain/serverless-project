const { Users, UserGroups } = require('../../db/models');

const getAuthUserPermissions = async (userId) => {
  const result = await Users.findOne({
    where: {
      id: userId,
    },
    attributes: ['id'],
    include: {
      model: UserGroups,
      attributes: ['permissions'],
      required: true,
    },
  });
  if (result) return result.dataValues.UserGroup.dataValues.permissions;
  else return false;
};
const checkExistUser = async (email) => {
  console.log('email :', email);
  const result = await Users.findOne({
    where: {
      email,
    },
    raw: true,
  });
  return result;
};
module.exports = {
  getAuthUserPermissions,
  checkExistUser,
};
