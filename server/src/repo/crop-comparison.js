const { validateAsync } = require('@parameter1/joi/utils');
const { ObjectId } = require('@parameter1/mongodb');
const PaginableRepo = require('./-paginable');
const Joi = require('../joi');
const { fields } = require('../schema/crop-comparison');
const { fields: userFields } = require('../schema/user');

class FarmFieldRepo extends PaginableRepo {
  constructor({ client, dbName }) {
    super({
      name: 'crop-comparison',
      collectionName: 'crop-comparisons',
      client,
      dbName,
    });
  }

  /**
   *
   * @param {object} params
   */
  async create(params = {}) {
    const {
      farmName,
      cropToCompare,
      acres,
      yieldPerAcre,
      pricePerBushel,
      email,
      options,
    } = await validateAsync(Joi.object({
      farmName: fields.farmName.required(),
      cropToCompare: fields.cropToCompare.required(),
      acres: fields.acres.required(),
      yieldPerAcre: fields.yieldPerAcre.required(),
      pricePerBushel: fields.pricePerBushel.required(),
      email: userFields.email.required(),
      options: Joi.object().default({}),
    }), params);

    const doc = {
      farmName,
      acres,
      createdByEmail: email,
      oleic: {
        _id: new ObjectId(),
        cropType: 'oleic',
        yieldPerAcre: 0,
        totalBushels: 0,
        pricePerBushel: 0,
        revenuePerBushel: 0,
      },
      comparedTo: {
        _id: new ObjectId(),
        cropType: cropToCompare,
        yieldPerAcre,
        totalBushels: yieldPerAcre * acres,
        pricePerBushel,
        revenuePerBushel: pricePerBushel,
      },
    };

    return this.insertOne({ doc, options: { ...options, withDates: true } });
  }
}

module.exports = FarmFieldRepo;
