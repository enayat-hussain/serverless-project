const gatewayService = require('../services/gateway-service');
const constants = require('../utils/constants');
const responseDispatcher = require('../utils/response-dispatcher');

module.exports = {
  create: async (req, res) => {
    const { body } = req;

    if (!body) {
      return responseDispatcher.dispatchError(res, constants.GATEWAY_DATA_NOT_PROVIDED);
    }

    try {
      const data = await gatewayService.create({ body });
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }

      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  update: async (req, res) => {
    const { body } = req;

    if (!body) {
      return responseDispatcher.dispatchError(res, constants.GATEWAY_DATA_NOT_PROVIDED);
    }

    try {
      const data = await gatewayService.update({ body });
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }

      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  list: async (req, res) => {
    const { body } = req;

    if (!body) {
      return responseDispatcher.dispatchError(res, constants.GATEWAY_DATA_NOT_PROVIDED);
    }

    try {
      const data = await gatewayService.create({ body });
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }

      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  delete: async (req, res) => {
    const { body } = req;

    if (!body) {
      return responseDispatcher.dispatchError(res, constants.GATEWAY_DATA_NOT_PROVIDED);
    }

    try {
      const data = await gatewayService.delete({ body });
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }

      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
};
