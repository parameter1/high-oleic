const { typeProjection } = require('@parameter1/graphql-directive-project/utils');
const round = require('../../utils/round');
const calculator = require('../../profit-calculator');
const divZero = require('../../utils/div-zero');

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
    advantage({ oleic, comparedTo, acres }) {
      const r1 = calculator({ ...comparedTo, acres });
      const r2 = calculator({ ...oleic, acres });

      return round(r2.profit.perAcre - r1.profit.perAcre, 2);
    },

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

    /**
     *
     */
    ratio({ oleic, comparedTo }) {
      const oleicPerBushel = (oleic.pricePerBushel || 0) + (oleic.premiumPerBushel || 0);
      const cropPerBushel = (comparedTo.pricePerBushel || 0) + (comparedTo.premiumPerBushel || 0);
      return round(divZero(oleicPerBushel, cropPerBushel, 0), 2);
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

    /**
     *
     */
    async cropComparisonExpenses(_, { input }, { auth, repos }, info) {
      await auth.check();
      const {
        id,
        applyTo,
        crop,
        fieldOps,
        handling,
      } = input;
      await checkUserCan('crop-comparison:set-expenses', { id, repos, auth });
      const projection = typeProjection(info);
      return repos.cropComparison.setExpenses({
        id,
        applyTo,
        crop,
        fieldOps,
        handling,
        findOptions: { projection },
      });
    },
  },
};
