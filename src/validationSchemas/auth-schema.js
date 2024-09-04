const Joi = require('joi');

const loginValidationSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  loginValidationSchema,
};
