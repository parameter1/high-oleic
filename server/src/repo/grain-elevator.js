const PaginableRepo = require('./-paginable');
const elevatorAddressList = require('../elevator-locator/address-list');

class GrainElevatorRepo extends PaginableRepo {
  constructor({ client, dbName }) {
    super({
      name: 'grain-elevator',
      collectionName: 'grain-elevators',
      client,
      dbName,
      collatableFields: ['companyName', 'affiliate'],
    });
  }

  async bulkUpsertFromList() {
    const operations = elevatorAddressList.map((item) => {
      const { long, lat, ...rest } = item;
      if (!long || !lat) return null;
      const filter = { 'location.coordinates.0': long, 'location.coordinates.1': lat };

      return {
        updateOne: {
          filter,
          update: {
            $setOnInsert: {
              location: {
                type: 'Point',
                coordinates: [long, lat],
              },
            },
            $set: Object.keys(rest).reduce((o, k) => {
              const value = rest[k];
              if (!value) return o;
              const trimmed = `${value}`.trim();
              if (!trimmed) return o;
              return { ...o, [k]: trimmed };
            }, {}),
          },
          upsert: true,
        },
      };
    }).filter((v) => v);
    if (operations.length) await this.bulkWrite({ operations });
  }
}

module.exports = GrainElevatorRepo;
