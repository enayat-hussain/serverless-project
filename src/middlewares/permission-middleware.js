const { MESSAGES } = require('../utils/constants');
const responseDispatcher = require('../utils/response-dispatcher');

module.exports.checkPermissions = (feature, permission) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      if (user) {
        const featurePermission = user.UserGroup.permissions[feature];

        if (
          featurePermission &&
          (featurePermission.includes(permission) || featurePermission.includes('full_access'))
        ) {
          return next();
        }
      }
      throw new Error(MESSAGES.PERMISSION_DENIED);
    } catch (error) {
      console.log(error);
      return responseDispatcher.dispatchError(res, error.message);
    }
  };
};
