const Joi = require('../joi');
const { fields: farmFieldFields } = require('./farm-field');
const { getCropTypes } = require('./crop-type');

const comparableCrops = getCropTypes().map(({ type }) => type).filter((type) => type !== 'oleic');

const fields = {
  id: Joi.mongoId(),
  farmName: Joi.string().trim(),
  acres: farmFieldFields.acres,
  cropToCompare: Joi.string().valid(...comparableCrops),
  yieldPerAcre: farmFieldFields.yieldPerAcre,
  pricePerBushel: farmFieldFields.pricePerBushel,
  premiumPerBushel: farmFieldFields.premiumPerBushel,
  applyTo: Joi.string().trim().valid('oleic', 'comparedTo'),
};

module.exports = { fields };
