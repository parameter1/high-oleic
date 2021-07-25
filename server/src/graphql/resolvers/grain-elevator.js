const { UserInputError } = require('apollo-server-express');
const { getAsObject } = require('@parameter1/utils');

module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    async grainElevatorsNearPostalCode(_, { input }, { repos }) {
      const { postalCode, maxDistance } = input;
      if (maxDistance < 1) throw new UserInputError('The search distance radius cannot be less than one mile.');
      const data = await repos.postalCodeLocation.findAndGeoCode({ value: postalCode });

      const { lng, lat } = getAsObject(data, 'geometry.location');
      if (!lng || !lat) throw new Error(`Unable to extract location data for postal code ${postalCode}`);

      const pipeline = [];
      pipeline.push({
        $geoNear: {
          near: { type: 'Point', coordinates: [lng, lat] },
          distanceField: 'distance',
          maxDistance: maxDistance * 1609.34, // convert miles to meters
        },
      });
      const cursor = await repos.grainElevator.aggregate({ pipeline });
      const docs = await cursor.toArray();
      return docs.map(({ distance, ...rest }) => ({
        elevator: rest,
        distance: distance / 1609.34, // convert meters back to miles
      }));
    },
  },
};
