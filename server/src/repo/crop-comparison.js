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
        pricePerBushel: 0,
        premiumPerBushel: 0,
      },
      comparedTo: {
        _id: new ObjectId(),
        cropType: cropToCompare,
        yieldPerAcre,
        pricePerBushel,
        premiumPerBushel: 0,
      },
    };

    return this.insertOne({ doc, options: { ...options, withDates: true } });
  }

  /**
   *
   * @param {*} params
   */
  async setAcres(params = {}) {
    const {
      id,
      acres,
      findOptions,
      updateOptions,
    } = await validateAsync(Joi.object({
      id: fields.id.required(),
      acres: fields.acres.required(),
      findOptions: Joi.object().default({}),
      updateOptions: Joi.object().default({}),
    }), params);
    const $set = { acres, updatedAt: new Date() };
    await this.updateOne({
      query: { _id: id },
      update: { $set },
      options: { ...updateOptions, strict: true },
    });
    return this.findByObjectId({ id, options: findOptions });
  }

  async setData(params = {}) {
    const {
      id,
      applyTo,
      pricePerBushel,
      premiumPerBushel,
      yieldPerAcre,
      findOptions,
      updateOptions,
    } = await validateAsync(Joi.object({
      id: fields.id.required(),
      applyTo: fields.applyTo.required(),
      pricePerBushel: fields.pricePerBushel,
      premiumPerBushel: fields.premiumPerBushel,
      yieldPerAcre: fields.yieldPerAcre,
      findOptions: Joi.object().default({}),
      updateOptions: Joi.object().default({}),
    }), params);

    const $set = {
      ...(pricePerBushel != null && { [`${applyTo}.pricePerBushel`]: pricePerBushel }),
      ...(premiumPerBushel != null && { [`${applyTo}.premiumPerBushel`]: premiumPerBushel }),
      ...(yieldPerAcre != null && { [`${applyTo}.yieldPerAcre`]: yieldPerAcre }),
    };
    if (Object.keys($set).length) {
      $set.updatedAt = new Date();
      await this.updateOne({
        query: { _id: id },
        update: { $set },
        options: { ...updateOptions, strict: true },
      });
    }
    return this.findByObjectId({ id, options: { ...findOptions, strict: true } });
  }
}

module.exports = FarmFieldRepo;
