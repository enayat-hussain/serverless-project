const userService = require('../services/user-service');
const constants = require('../utils/constants');
const responseDispatcher = require('../utils/response-dispatcher');

module.exports = {
  createUser: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const data = await userService.create({
        body: req.body,
        authorizedUser: req.user,
        clientIdInHeader,
      });
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }
      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  addBulkUser: async (req, res) => {
    const { headers, body } = req;

    if (!body) {
      return responseDispatcher.dispatchError(res, constants.USER_DATA_NOT_PROVIDED);
    }

    try {
      const clientIdInHeader = headers['client-id'];
      const data = await userService.bulkCreate({
        body: body,
        authorizedUser: req.user,
        clientIdInHeader,
      });
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }
      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  updateUser: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const data = await userService.update({
        body: req.body,
        authorizedUser: req.user,
        clientIdInHeader,
      });
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }
      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  updateBulkUser: async (req, res) => {
    const { headers, body } = req;

    if (!body) {
      return responseDispatcher.dispatchError(res, constants.USER_DATA_NOT_PROVIDED);
    }

    try {
      const clientIdInHeader = headers['client-id'];
      const data = await userService.bulkUpdate({
        body: body,
        authorizedUser: req.user,
        clientIdInHeader,
      });
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }
      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const data = await userService.deleteUser({ body: req.body });
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }
      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  deleteBulkUser: async (req, res) => {
    const { body } = req;

    if (!body) {
      return responseDispatcher.dispatchError(res, constants.USER_DATA_NOT_PROVIDED);
    }

    try {
      const result = await userService.bulkDelete({ body });
      if (result.error) {
        return responseDispatcher.dispatchError(res, result.message);
      }
      responseDispatcher.dispatch(res, result);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  disableUser: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const data = await userService.enableDisableUser({
        body: req.body,
        authorizedUser: req.user,
        clientIdInHeader,
        status: constants.userStatus.INACTIVE,
      });
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }
      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  enableUser: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const data = await userService.enableDisableUser({
        body: req.body,
        authorizedUser: req.user,
        clientIdInHeader,
        status: constants.userStatus.ACTIVE,
      });
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }
      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  userInfo: async (req, res) => {
    try {
      const userId = req.params.userId;
      const data = await userService.userInfo({ userId });
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }
      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  listUser: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const data = await userService.list({
        queryParams: req.query,
        authorizedUser: req.user,
        clientIdInHeader,
      });
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }
      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  userVerify: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const data = await userService.userVerify({
        body: req.body,
        authorizedUser: req.user,
        clientIdInHeader,
      });
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }
      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  resendInvitation: async (req, res) => {
    try {
      const userId = req.params.userId;
      const data = await userService.resendInvitation({
        userId,
      });
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }
      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
};
