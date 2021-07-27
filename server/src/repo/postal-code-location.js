const { validateAsync } = require('@parameter1/joi/utils');
const { get } = require('@parameter1/utils');
const PaginableRepo = require('./-paginable');
const Joi = require('../joi');
const GeoCode = require('../geocode');

class PostalCodeLocationRepo extends PaginableRepo {
  constructor({ client, dbName }) {
    super({
      name: 'postal-code-location',
      collectionName: 'postal-code-locations',
      client,
      dbName,
    });
  }

  /**
   *
   * @param {object} params
   * @param {string} params.value The postal code to find and geocode if not found
   * @param {object} params.options
   */
  async findAndGeoCode(params = {}) {
    const { value, options } = await validateAsync(Joi.object({
      value: Joi.string().trim().required(),
      options: Joi.object().default({}),
    }), params);

    const doc = await this.findOne({ query: { value }, options });
    if (doc) return doc.data;

    // existing document not found. geocode and upsert.
    const response = await GeoCode.forPostalCode({ postalCode: value });
    const data = get(response, 'results.0');
    if (!data) throw new Error(`Unable to get a geocoded response for postal code ${value}`);
    const location = get(data, 'geometry.location');
    if (!location) throw new Error(`Unable to get geometry for postal code ${value}`);
    const query = { value };
    const update = { $setOnInsert: { value, data, date: new Date() } };
    await this.updateOne({ query, update, options: { upsert: true } });
    return data;
  }
}

module.exports = PostalCodeLocationRepo;
