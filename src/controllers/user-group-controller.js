const userGroupService = require('../services/user-group-service');
// const constants = require('../utils/constants');
const responseDispatcher = require('../utils/response-dispatcher');
module.exports = {
  createUserGroup: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const data = await userGroupService.create({
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
  updateUserGroup: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const data = await userGroupService.update({
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
  listUserGroup: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const data = await userGroupService.list({
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
  userGroupInfo: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const id = req.params.id;

      const data = await userGroupService.userGroupInfo({
        id,
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
  deleteUserGroup: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const id = req.params.id;
      const data = await userGroupService.deleteUserGroup({
        id,
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
};
