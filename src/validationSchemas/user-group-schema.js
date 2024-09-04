const Joi = require('joi');
const { COMMON_STATUS } = require('../utils/constants');
const common_field = {
  name: Joi.string().required(),
  permissions: Joi.object().required(),
  status: Joi.string().valid(COMMON_STATUS.ACTIVE, COMMON_STATUS.INACTIVE).required(),
  clientId: Joi.number().required(),
  type: Joi.string().required(),
  role: Joi.string().allow(null),
  platform: Joi.string().allow(null),
  default: Joi.string().allow(null),
};
const createUserGroupSchema = Joi.object().keys({
  ...common_field,
});
const updateUserGroupSchema = Joi.object().keys({
  id: Joi.number().required(),
  ...common_field,
});

module.exports = {
  createUserGroupSchema,
  updateUserGroupSchema,
};
