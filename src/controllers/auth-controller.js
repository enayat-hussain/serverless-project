const loginService = require('../services/auth-service');
const responseDispatcher = require('../utils/response-dispatcher');
module.exports = {
  login: async (req, res) => {
    try {
      const data = await loginService.login(req.body);
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }
      responseDispatcher.dispatch(res, data);
    } catch (error) {
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const data = await loginService.forgotPassword(req.body.email);
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }
      responseDispatcher.dispatch(res, data);
    } catch (error) {
      console.log(error);
      responseDispatcher.dispatchError(res, error.message);
    }
  },
  confirmPassword: async (req, res) => {
    try {
      const data = await loginService.forgotPasswordConfirm(req.body);
      if (data.error) {
        return responseDispatcher.dispatchError(res, data.message);
      }
      responseDispatcher.dispatch(res, data);
    } catch (error) {
      console.log(error);
      responseDispatcher.dispatchError(res, error.message);
    }
  },
};
