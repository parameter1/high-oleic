const { validateAsync } = require('@parameter1/joi/utils');
const PaginableRepo = require('./-paginable');
const ReportRepo = require('./report');
const Joi = require('../joi');
const { fields, expensesCategories } = require('../schema/farm-field');

class FarmFieldRepo extends PaginableRepo {
  constructor({ client, dbName, reportRepo }) {
    super({
      name: 'farm-field',
      collectionName: 'farm-fields',
      client,
      dbName,
    });
    if (!(reportRepo instanceof ReportRepo)) throw new Error('The `reportRepo` must be an instance of ReportRepo');
    this.reportRepo = reportRepo;
  }

  /**
   *
   * @param {object} params
   */
  async create(params = {}) {
    const {
      reportId,
      name,
      cropType,
      acres,
      yieldPerAcre,
      pricePerBushel,
      premiumPerBushel,
      options,
    } = await validateAsync(Joi.object({
      reportId: fields.reportId.required(),
      name: fields.name,
      cropType: fields.cropType.required(),
      acres: fields.acres.required(),
      yieldPerAcre: fields.yieldPerAcre.required(),
      pricePerBushel: fields.pricePerBushel.required(),
      premiumPerBushel: fields.premiumPerBushel.default(0),
      options: Joi.object().default({}),
    }), params);

    const report = await this.reportRepo.findByObjectId({
      id: reportId,
      options: { strict: true, projection: { name: 1, farm: 1 } },
    });

    const doc = {
      report,
      name: name || undefined,
      cropType,
      acres,
      yieldPerAcre,
      pricePerBushel,
      premiumPerBushel,
    };

    return this.insertOne({ doc, options: { ...options, withDates: true } });
  }

  /**
   *
   * @param {object} params
   */
  async setExpenses(params = {}) {
    const {
      fieldId,
      updateOptions,
      findOptions,
    } = await validateAsync(Joi.object({
      fieldId: fields.id.required(),

      crop: Joi.array().items(
        Joi.object({
          lineItem: fields.cropExpenseLineItems.required(),
          value: fields.expenseValue.required(),
        }),
      ).default([]),

      fieldOps: Joi.array().items(
        Joi.object({
          lineItem: fields.fieldOpsExpenseLineItems.required(),
          value: fields.expenseValue.required(),
        }),
      ).default([]),

      handling: Joi.array().items(
        Joi.object({
          lineItem: fields.handlingExpenseLineItems.required(),
          value: fields.expenseValue.required(),
        }),
      ).default([]),

      updateOptions: Joi.object().default({}),
      findOptions: Joi.object().default({}),
    }), params);

    const query = { _id: fieldId };
    const $set = {
      ...expensesCategories.reduce((o, key) => ({
        ...o,
        ...params[key].reduce((o2, { lineItem, value }) => {
          const field = `expenses.${key}.${lineItem}`;
          return { ...o2, [field]: value };
        }, {}),
      }), {}),
      updatedAt: new Date(),
    };
    await this.updateOne({ query, update: { $set }, options: { ...updateOptions, strict: true } });
    return this.findByObjectId({ id: fieldId, options: findOptions });
  }

  /**
   *
   * @param {object} params
   */
  async setIncome(params = {}) {
    const {
      fieldId,
      categories,
      updateOptions,
      findOptions,
    } = await validateAsync(Joi.object({
      fieldId: fields.id.required(),

      categories: Joi.array().items(
        Joi.object({
          type: fields.incomeCategory.required(),
          value: fields.incomeValue.required(),
        }),
      ).default([]),

      updateOptions: Joi.object().default({}),
      findOptions: Joi.object().default({}),
    }), params);

    const query = { _id: fieldId };
    const $set = {
      ...categories.reduce((o, { type, value }) => {
        const field = `income.${type}`;
        return { ...o, [field]: value };
      }, {}),
      updatedAt: new Date(),
    };
    await this.updateOne({ query, update: { $set }, options: { ...updateOptions, strict: true } });
    return this.findByObjectId({ id: fieldId, options: findOptions });
  }
}

module.exports = FarmFieldRepo;
