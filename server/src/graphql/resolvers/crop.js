const { getCropTypes } = require('../../schema/crop-type');

module.exports = {
  /**
   *
   */
  Crop: {
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
    OTHER: 'other',
  },

  /**
   *
   */
  ComparisonCropTypeEnum: {
    CORN: 'corn',
    SOY: 'soy',
    WHEAT: 'wheat',
    OTHER: 'other',
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    crops(_, { input }) {
      const { exclude } = input;
      const types = getCropTypes();
      if (!exclude.length) return types;
      return types.filter(({ type }) => !exclude.includes(type));
    },
  },
};
