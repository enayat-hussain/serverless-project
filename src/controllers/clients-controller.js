const clientsService = require('../services/clients-service');
const constants = require('../utils/constants');
const responseDispatcher = require('../utils/response-dispatcher');

module.exports = {
  create: async (req, res) => {
    const { body } = req;

    if (!body) {
      return responseDispatcher.dispatchError(res, constants.CLIENT_DATA_NOT_PROVIDED);
    }

    try {
      const data = await clientsService.create({ body });
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
      return responseDispatcher.dispatchError(res, constants.CLIENT_DATA_NOT_PROVIDED);
    }

    try {
      const data = await clientsService.update({ body });

      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }

      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  ClientInfo: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return responseDispatcher.dispatchError(res, constants.CLIENT_DATA_NOT_PROVIDED);
    }

    try {
      const data = await clientsService.clientInfo(id);

      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }

      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  ClientInfo: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return responseDispatcher.dispatchError(res, constants.CLIENT_DATA_NOT_PROVIDED);
    }
    try {
      const data = await clientsService.clientInfo(id);
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }
      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  list: async (req, res) => {
    try {
      const data = await clientsService.list();
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }

      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  disableEnableClient: async (req, res) => {
    const { body } = req;

    if (!body) {
      return responseDispatcher.dispatchError(res, constants.CLIENT_DATA_NOT_PROVIDED);
    }

    try {
      const data = await clientsService.disableEnableClient({ body });

      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }

      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  delete: async (req, res) => {
    const { params } = req;

    if (!params.id) {
      return responseDispatcher.dispatchError(res, constants.CLIENT_DATA_NOT_PROVIDED);
    }

    try {
      const data = await clientsService.deleteClient(params.id);

      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }

      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
};
