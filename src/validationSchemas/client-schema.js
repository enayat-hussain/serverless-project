const Joi = require('joi');

const common_field = {
  companyName: Joi.string().max(100).required(),
  status: Joi.string().valid('active', 'inactive', 'deleted').default('active'),
  projectName: Joi.string().max(100).required(),
  companyLogo: Joi.string(),
  address1: Joi.string().max(100),
  address2: Joi.string().max(100),
  city: Joi.string().max(50),
  state: Joi.string().max(50),
  zip: Joi.string().max(10),
  country: Joi.string().max(50),
  latitude: Joi.number().min(-90).max(90),
  longitude: Joi.number().min(-180).max(180),
  stateCode: Joi.string().min(2).max(5),
  shortCode: Joi.string().min(2).max(10),
  slug: Joi.string().max(100).required(),
};
const createClientSchema = Joi.object().keys({
  ...common_field,
});
const updateClientSchema = Joi.object().keys({
  id: Joi.number().required(),
  ...common_field,
});

module.exports = {
  createClientSchema,
  updateClientSchema,
};
