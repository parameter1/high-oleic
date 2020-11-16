const Joi = require('../joi');

const fields = {
  id: Joi.mongoId(),
  name: Joi.string().trim(),
  postalCode: Joi.string().trim(),
};

module.exports = {
  fields,
};
