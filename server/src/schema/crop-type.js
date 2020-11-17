const Joi = require('../joi');

const getCropTypes = () => [
  {
    type: 'corn',
    label: 'Corn',
  },
  {
    type: 'soy',
    label: 'Soybeans',
  },
  {
    type: 'oleic',
    label: 'High Oleic Soybeans',
  },
  {
    type: 'wheat',
    label: 'Wheat',
  },
];

const fields = {
  cropType: Joi.string().valid(...getCropTypes().map(({ type }) => type)),
};

module.exports = {
  fields,
  getCropTypes,
};
