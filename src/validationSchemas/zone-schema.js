const Joi = require('joi');
const common_field = {
  name: Joi.string().max(100),
  status: Joi.string().valid('active', 'inactive', 'deleted'),
  addedBy: Joi.number().integer().allow(null),
  clientId: Joi.number().integer().allow(null),
  // propertyId: Joi.number().integer().allow(null),
};
const createZoneSchema = Joi.object().keys({
  ...common_field,
});
const updateZoneSchema = Joi.object().keys({
  id: Joi.number().required(),
  ...common_field,
});

module.exports = {
  createZoneSchema,
  updateZoneSchema,
};
