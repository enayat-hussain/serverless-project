const propertyService = require('../services/properties-service');
// const constants = require('../utils/constants');
const responseDispatcher = require('../utils/response-dispatcher');
module.exports = {
  createProperties: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const data = await propertyService.create({
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
  updateProperties: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const data = await propertyService.update({
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
  listProperties: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const data = await propertyService.list({
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
  propertyInfo: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const id = req.params.id;

      const data = await propertyService.propertyInfo({
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
  deleteProperty: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const id = req.params.id;
      const data = await propertyService.deleteProperty({
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
