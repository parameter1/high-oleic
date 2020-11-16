const { typeProjection, connectionProjection } = require('@parameter1/graphql-directive-project/utils');
const summary = require('../../profit-calculator/summary');
const round = require('../../utils/round');

module.exports = {
  /**
   *
   */
  Report: {
    /**
     *
     */
    farm({ farm }, _, { loaders }, info) {
      const projection = typeProjection(info);
      const localFields = ['_id', 'name'];
      const needsQuery = Object.keys(projection).some((field) => !localFields.includes(field));
      if (!needsQuery) return farm;
      return loaders.farm.load({ id: farm._id, projection });
    },

    /**
     *
     */
    async farmFields(report, _, { repos }, info) {
      const params = {
        query: { 'report._id': report._id },
        projection: connectionProjection(info),
      };
      return repos.farmField.paginate(params);
    },

    /**
     *
     */
    async summary(report, _, { repos }) {
      const cursor = await repos.farmField.find({
        query: { 'report._id': report._id },
      });
      const farmFields = await cursor.toArray();
      return summary({ farmFields });
    },
  },

  /**
   *
   */
  ReportSummary: {
    /**
     *
     */
    acres({ acres: value }) {
      return round(value, 0);
    },
  },

  /**
   *
   */
  ReportIncomeSummary: {
    total({ total: value }) {
      return round(value, 2);
    },
    avgPerAcre({ avgPerAcre: value }) {
      return round(value, 2);
    },
  },

  /**
   *
   */
  ReportExpenseSummary: {
    total({ total: value }) {
      return round(value, 2);
    },
    avgPerAcre({ avgPerAcre: value }) {
      return round(value, 2);
    },
  },

  /**
   *
   */
  ReportExpenseCategorySummary: {
    category(category) {
      return category;
    },
    total(category) {
      return round(category.costs.total, 2);
    },
    avgPerAcre(category) {
      return round(category.costs.avgPerAcre, 2);
    },
  },

  /**
   *
   */
  ReportExpenseCategoryLineItemSummary: {
    lineItem(lineItem) {
      return lineItem;
    },
    total(lineItem) {
      return round(lineItem.costs.total, 2);
    },
    avgPerAcre(lineItem) {
      return round(lineItem.costs.avgPerAcre, 2);
    },
  },

  /**
   *
   */
  ReportProfitSummary: {
    total({ total: value }) {
      return round(value, 2);
    },
    avgPerAcre({ avgPerAcre: value }) {
      return round(value, 2);
    },
    margin({ margin: value }) {
      return round(value, 4);
    },
  },

  /**
   *
   */
  ReportSortFieldEnum: {
    ID: '_id',
    NAME: 'name',
    UPDATED_AT: 'updatedAt',
    FARM_NAME: 'farm.name',
  },

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    createReport(_, { input }, { repos }) {
      const { name, growingSeason, farmId } = input;
      return repos.report.create({
        name,
        farmId,
        seasonStart: growingSeason.start,
        seasonEnd: growingSeason.end,
      });
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    report(_, { input }, { repos }, info) {
      const { id, strict } = input;
      const options = {
        strict,
        projection: typeProjection(info),
      };
      return repos.report.findByObjectId({ id, options });
    },
  },
};
