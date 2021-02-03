const { typeProjection, connectionProjection } = require('@parameter1/graphql-directive-project/utils');
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
    async cloneCropComparison(_, { input }, { auth, repos }) {
      await auth.check();
      const { id } = input;
      const email = auth.user.get('email');
      const comparison = await repos.cropComparison.findByObjectId({
        id,
        options: { strict: true, projection: { createdByEmail: 1 } },
      });
      if (email !== comparison.createdByEmail) throw new Error('You do not have permission to clone this report.');
      return repos.cropComparison.clone({ id });
    },

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
    async cropComparisonCrop(_, { input }, { auth, repos }, info) {
      await auth.check();
      const { id, cropToCompare } = input;
      await checkUserCan('crop-comparison:set-crop-to-compare', { id, repos, auth });
      const projection = typeProjection(info);
      return repos.cropComparison.setCropToCompare({
        id,
        cropToCompare,
        findOptions: { projection },
      });
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
        crop,
        chemicals,
        fieldOps,
        handling,
      } = input;
      await checkUserCan('crop-comparison:set-expenses', { id, repos, auth });
      const projection = typeProjection(info);
      return repos.cropComparison.setExpenses({
        id,
        crop,
        chemicals,
        fieldOps,
        handling,
        findOptions: { projection },
      });
    },

    /**
     *
     */
    async cropComparisonFarmName(_, { input }, { auth, repos }, info) {
      await auth.check();
      const { id, farmName } = input;
      await checkUserCan('crop-comparison:set-farm-name', { id, repos, auth });
      const projection = typeProjection(info);
      return repos.cropComparison.setFarmName({
        id,
        farmName,
        findOptions: { projection },
      });
    },

    /**
     *
     */
    async deleteCropComparison(_, { input }, { auth, repos }) {
      await auth.check();
      const { id } = input;
      const email = auth.user.get('email');
      const comparison = await repos.cropComparison.findByObjectId({
        id,
        options: { strict: true, projection: { createdByEmail: 1 } },
      });
      if (email !== comparison.createdByEmail) throw new Error('You do not have permission to delete this report.');
      await repos.cropComparison.deleteOne({ query: { _id: id } });
      return true;
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    async cropComparison(_, { input }, { auth, repos }, info) {
      await auth.check();
      const { id, strict } = input;
      const options = {
        strict,
        projection: { ...typeProjection(info), createdByEmail: 1 },
      };
      const comparison = await repos.cropComparison.findByObjectId({ id, options });
      if (!comparison) return null;
      await auth.checkCan('crop-comparison:view', comparison);
      return comparison;
    },

    /**
     *
     */
    async myCropComparisons(_, { input }, { auth, repos }, info) {
      await auth.check();
      const email = auth.user.get('email');
      const { pagination } = input;
      const options = { projection: connectionProjection(info), ...pagination };
      return repos.cropComparison.paginateForUser({ email, options });
    },
  },
};
