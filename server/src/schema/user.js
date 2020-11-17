const Joi = require('../joi');

const fields = {
  id: Joi.mongoId(),
  email: Joi.string().trim().email(),
};

module.exports = { fields };
