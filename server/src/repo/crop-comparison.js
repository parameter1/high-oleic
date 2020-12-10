const { validateAsync } = require('@parameter1/joi/utils');
const { ObjectId } = require('@parameter1/mongodb');
const PaginableRepo = require('./-paginable');
const Joi = require('../joi');
const { fields } = require('../schema/crop-comparison');
const { fields: userFields } = require('../schema/user');
const { fields: farmFieldFields, expensesCategories } = require('../schema/farm-field');

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
  async clone(params = {}) {
    const { id } = await validateAsync(Joi.object({
      id: fields.id.required(),
    }), params);

    const doc = await this.findByObjectId({ id, options: { strict: true } });
    return this.insertOne({
      doc: { ...doc, farmName: `Copy of ${doc.farmName}`, _id: undefined },
      options: { withDates: true },
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
   * @param {object} params
   * @param {string|ObjectId} params.email
   * @param {object} [params.options]
   */
  async paginateForUser(params = {}) {
    const { email, options } = await validateAsync(Joi.object({
      email: userFields.email.required(),
      options: Joi.object().default({}),
    }).required(), params);
    const query = { createdByEmail: email };
    return this.paginate({ ...options, query });
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

  /**
   *
   * @param {object} params
   */
  async setCropToCompare(params = {}) {
    const {
      id,
      cropToCompare,
      findOptions,
      updateOptions,
    } = await validateAsync(Joi.object({
      id: fields.id.required(),
      cropToCompare: fields.cropToCompare.required(),
      findOptions: Joi.object().default({}),
      updateOptions: Joi.object().default({}),
    }), params);
    const $set = { 'comparedTo.cropType': cropToCompare, updatedAt: new Date() };
    await this.updateOne({
      query: { _id: id },
      update: { $set },
      options: { ...updateOptions, strict: true },
    });
    return this.findByObjectId({ id, options: findOptions });
  }

  /**
   *
   * @param {*} params
   */
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

  /**
   *
   * @param {object} params
   */
  async setExpenses(params = {}) {
    const {
      id,
      updateOptions,
      findOptions,
    } = await validateAsync(Joi.object({
      id: fields.id.required(),

      crop: Joi.array().items(
        Joi.object({
          applyTo: fields.applyTo.required(),
          lineItem: farmFieldFields.cropExpenseLineItems.required(),
          value: farmFieldFields.expenseValue.required(),
        }),
      ).default([]),

      chemicals: Joi.array().items(
        Joi.object({
          applyTo: fields.applyTo.required(),
          lineItem: farmFieldFields.chemicalsExpenseLineItems.required(),
          value: farmFieldFields.expenseValue.required(),
        }),
      ).default([]),

      fieldOps: Joi.array().items(
        Joi.object({
          applyTo: fields.applyTo.required(),
          lineItem: farmFieldFields.fieldOpsExpenseLineItems.required(),
          value: farmFieldFields.expenseValue.required(),
        }),
      ).default([]),

      handling: Joi.array().items(
        Joi.object({
          applyTo: fields.applyTo.required(),
          lineItem: farmFieldFields.handlingExpenseLineItems.required(),
          value: farmFieldFields.expenseValue.required(),
        }),
      ).default([]),

      updateOptions: Joi.object().default({}),
      findOptions: Joi.object().default({}),
    }), params);

    const query = { _id: id };
    const $set = {
      ...expensesCategories.reduce((o, key) => ({
        ...o,
        ...params[key].reduce((o2, { applyTo, lineItem, value }) => {
          const field = `${applyTo}.expenses.${key}.${lineItem}`;
          return { ...o2, [field]: value };
        }, {}),
      }), {}),
      updatedAt: new Date(),
    };
    await this.updateOne({ query, update: { $set }, options: { ...updateOptions, strict: true } });
    return this.findByObjectId({ id, options: findOptions });
  }

  /**
   *
   * @param {object} params
   */
  async setFarmName(params = {}) {
    const {
      id,
      farmName,
      findOptions,
      updateOptions,
    } = await validateAsync(Joi.object({
      id: fields.id.required(),
      farmName: fields.farmName.required(),
      findOptions: Joi.object().default({}),
      updateOptions: Joi.object().default({}),
    }), params);
    const $set = { farmName, updatedAt: new Date() };
    await this.updateOne({
      query: { _id: id },
      update: { $set },
      options: { ...updateOptions, strict: true },
    });
    return this.findByObjectId({ id, options: findOptions });
  }
}

module.exports = FarmFieldRepo;
