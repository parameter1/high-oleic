const Joi = require('../joi');
const { fields: farmFields } = require('./farm');

const fields = {
  id: Joi.mongoId(),
  name: Joi.string().trim(),
  farmId: farmFields.id,
  seasonStart: Joi.date(),
  seasonEnd: Joi.date(),
};

module.exports = {
  fields,
};
