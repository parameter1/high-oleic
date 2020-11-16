const { typeProjection, connectionProjection } = require('@parameter1/graphql-directive-project/utils');

module.exports = {
  /**
   *
   */
  Farm: {
    /**
     *
     */
    reports(farm, { input }, { repos }, info) {
      const { sort, pagination } = input;
      const params = {
        query: { 'farm._id': farm._id },
        sort,
        projection: connectionProjection(info),
        ...pagination,
      };
      return repos.report.paginate(params);
    },
  },

  /**
   *
   */
  FarmSortFieldEnum: {
    ID: '_id',
    NAME: 'name',
    UPDATED_AT: 'updatedAt',
  },

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    createFarm(_, { input }, { repos }) {
      const { name, postalCode } = input;
      return repos.farm.create({ name, postalCode });
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    farm(_, { input }, { repos }, info) {
      const { id, strict } = input;
      const options = {
        strict,
        projection: typeProjection(info),
      };
      return repos.farm.findByObjectId({ id, options });
    },
  },
};
