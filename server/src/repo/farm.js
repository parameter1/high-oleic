const { validateAsync } = require('@parameter1/joi/utils');
const PaginableRepo = require('./-paginable');
const Joi = require('../joi');
const { fields } = require('../schema/farm');

class FarmRepo extends PaginableRepo {
  constructor({ client, dbName }) {
    super({
      name: 'farm',
      collectionName: 'farms',
      client,
      dbName,
      collatableFields: ['name'],
    });
  }

  /**
   *
   * @param {object} params
   */
  async create(params = {}) {
    const { name, postalCode, options } = await validateAsync(Joi.object({
      name: fields.name.required(),
      postalCode: fields.postalCode.required(),
      options: Joi.object().default({}),
    }), params);
    const doc = { name, postalCode };
    return this.insertOne({ doc, options: { ...options, withDates: true } });
  }
}

module.exports = FarmRepo;
