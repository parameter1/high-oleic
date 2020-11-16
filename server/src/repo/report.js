const { validateAsync } = require('@parameter1/joi/utils');
const PaginableRepo = require('./-paginable');
const FarmRepo = require('./farm');
const Joi = require('../joi');
const { fields } = require('../schema/report');

class ReportRepo extends PaginableRepo {
  constructor({ client, dbName, farmRepo }) {
    super({
      name: 'report',
      collectionName: 'reports',
      client,
      dbName,
      collatableFields: ['name', 'farm.name'],
    });
    if (!(farmRepo instanceof FarmRepo)) throw new Error('The `farmRepo` must be an instance of FarmRepo');
    this.farmRepo = farmRepo;
  }

  /**
   *
   * @param {object} params
   */
  async create(params = {}) {
    const {
      name,
      farmId,
      seasonStart,
      seasonEnd,
      options,
    } = await validateAsync(Joi.object({
      name: fields.name.required(),
      farmId: fields.farmId.required(),
      seasonStart: fields.seasonStart.required(),
      seasonEnd: fields.seasonEnd.required(),
      options: Joi.object().default({}),
    }), params);

    const farm = await this.farmRepo.findByObjectId({
      id: farmId,
      options: { strict: true, projection: { name: 1 } },
    });

    const doc = {
      name: name || undefined,
      farm,
      growingSeason: {
        start: seasonStart,
        end: seasonEnd,
      },
    };

    return this.insertOne({ doc, options: { ...options, withDates: true } });
  }
}

module.exports = ReportRepo;
