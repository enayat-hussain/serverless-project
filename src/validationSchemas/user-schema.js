const Joi = require('joi');
const common_field = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  userGroupId: Joi.number().required(),
  type: Joi.string().required(),
  role: Joi.string(),
  clientId: Joi.string(),
  profileImage: Joi.string(),
  phoneNumber: Joi.string(),
  isPhoneVerified: Joi.string(),
  phoneCountryCode: Joi.string(),
  pushNotificationSetting: Joi.string(),
  emailNotificationSetting: Joi.string(),
  smsNotificationSetting: Joi.string(),
  timezone: Joi.string(),
  projectId: Joi.number(),
  emailNotificationPreferences: Joi.string(),
};
const createUserSchema = Joi.object().keys({
  ...common_field,
});
const updateUserSchema = Joi.object().keys({
  id: Joi.number().required(),
  ...common_field,
});
const enableDisableUserSchema = Joi.object().keys({
  ids: Joi.array().items(Joi.number()).min(1).required(),
});

module.exports = {
  createUserSchema,
  enableDisableUserSchema,
  updateUserSchema,
};
