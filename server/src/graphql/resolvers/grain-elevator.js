const { UserInputError } = require('apollo-server-express');
const { getAsObject } = require('@parameter1/utils');
const round = require('../../utils/round');

module.exports = {
  /**
   *
   */
  GrainElevator: {
    /**
     *
     */
    name(elevator) {
      const affiliate = elevator.affiliate.trim();
      const companyName = elevator.companyName.trim();
      if (affiliate === companyName) return companyName;
      return `${companyName} (${affiliate})`;
    },
  },

  /**
   *
   */
  GrainElevatorNearPostalCode: {
    /**
     *
     */
    distance({ distance }, { input }) {
      const { round: precision } = input;
      if (precision == null) return distance;
      return round(distance, precision);
    },
  },

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
      const milesToMeters = 1609.34;
      pipeline.push({
        $geoNear: {
          near: { type: 'Point', coordinates: [lng, lat] },
          distanceField: 'distance',
          maxDistance: maxDistance * milesToMeters, // convert miles to meters
        },
      });
      const cursor = await repos.grainElevator.aggregate({ pipeline });
      const docs = await cursor.toArray();
      return docs.map(({ distance, ...rest }) => ({
        elevator: rest,
        distance: distance / milesToMeters, // convert meters back to miles
      }));
    },
  },
};
