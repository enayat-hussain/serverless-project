const customerService = require('../services/customers-service');
const responseDispatcher = require('../utils/response-dispatcher');
module.exports = {
  createCustomer: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const data = await customerService.create({
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
  updateCustomer: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const data = await customerService.update({
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
  listCustomer: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const data = await customerService.list({
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
  customerInfo: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const id = req.params.id;

      const data = await customerService.customerInfo({
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
  deleteCustomer: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const id = req.params.id;
      const data = await customerService.deleteCustomer({
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
  sendOtp: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const data = await customerService.sendOtp({
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
  transferOwnership: async (req, res) => {
    try {
      const clientIdInHeader = req.headers['client-id'];
      const data = await customerService.transferOwnership({
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
};
