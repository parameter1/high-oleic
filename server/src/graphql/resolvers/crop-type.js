const { getCropTypes } = require('../../schema/crop-type');

module.exports = {
  /**
   *
   */
  CropType: {
    id({ type }) {
      return type;
    },
  },

  /**
   *
   */
  CropTypeEnum: {
    CORN: 'corn',
    SOY: 'soy',
    OLEIC: 'oleic',
    WHEAT: 'wheat',
  },

  /**
   *
   */
  ComparisonCropTypeEnum: {
    CORN: 'corn',
    SOY: 'soy',
    WHEAT: 'wheat',
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    cropTypes(_, { input }) {
      const { exclude } = input;
      const types = getCropTypes();
      if (!exclude.length) return types;
      return types.filter(({ type }) => !exclude.includes(type));
    },
  },
};
