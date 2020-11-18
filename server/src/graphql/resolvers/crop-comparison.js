const { typeProjection } = require('@parameter1/graphql-directive-project/utils');

const checkUserCan = async (action, { id, repos, auth }) => {
  const comparison = await repos.cropComparison.findByObjectId({
    id,
    options: { strict: true, projection: { createdByEmail: 1 } },
  });
  await auth.checkCan(action, comparison);
};

module.exports = {
  /**
   *
   */
  CropComparison: {
    /**
     *
     */
    oleic({ oleic, acres }) {
      return { ...oleic, acres };
    },

    /**
     *
     */
    comparedTo({ comparedTo, acres }) {
      return { ...comparedTo, acres };
    },
  },

  /**
   *
   */
  CropComparisonFieldTypeEnum: {
    OLEIC: 'oleic',
    COMPARED_CROP: 'comparedTo',
  },

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    async createCropComparison(_, { input }, { auth, repos }) {
      await auth.check();
      const email = auth.user.get('email');
      return repos.cropComparison.create({
        ...input,
        email,
      });
    },

    /**
     *
     */
    async cropComparisonAcres(_, { input }, { auth, repos }, info) {
      await auth.check();
      const { id, acres } = input;
      await checkUserCan('crop-comparison:set-acres', { id, repos, auth });
      const projection = typeProjection(info);
      return repos.cropComparison.setAcres({ id, acres, findOptions: { projection } });
    },

    /**
     *
     */
    async cropComparisonData(_, { input }, { auth, repos }, info) {
      await auth.check();
      const {
        id,
        applyTo,
        pricePerBushel,
        premiumPerBushel,
        yieldPerAcre,
      } = input;
      await checkUserCan('crop-comparison:set-data', { id, repos, auth });
      const projection = typeProjection(info);
      return repos.cropComparison.setData({
        id,
        applyTo,
        pricePerBushel,
        premiumPerBushel,
        yieldPerAcre,
        findOptions: { projection },
      });
    },
  },
};
