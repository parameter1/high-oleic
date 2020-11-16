const { typeProjection } = require('@parameter1/graphql-directive-project/utils');
const calculator = require('../../profit-calculator');
const round = require('../../utils/round');

module.exports = {
  /**
   *
   */
  FarmField: {
    /**
     *
     */
    expenses(field) {
      return calculator(field).expenses;
    },

    /**
     *
     */
    income(field) {
      return calculator(field).income;
    },

    /**
     *
     */
    premiumPerBushel({ premiumPerBushel }) {
      return round(premiumPerBushel, 2);
    },

    /**
     *
     */
    pricePerBushel({ pricePerBushel }) {
      return round(pricePerBushel, 2);
    },

    /**
     *
     */
    profit(field) {
      return calculator(field).profit;
    },

    /**
     *
     */
    report({ report }, _, { loaders }, info) {
      const projection = typeProjection(info);
      const localFields = ['_id', 'name'];
      const needsQuery = Object.keys(projection).some((field) => !localFields.includes(field));
      if (!needsQuery) return report;
      return loaders.report.load({ id: report._id, projection });
    },

    /**
     *
     */
    revenuePerBushel({ revenuePerBushel }) {
      return round(revenuePerBushel, 2);
    },

    /**
     *
     */
    totalBushels({ totalBushels }) {
      return round(totalBushels, 2);
    },

    /**
     *
     */
    yieldPerAcre({ yieldPerAcre }) {
      return round(yieldPerAcre, 2);
    },
  },

  /**
   *
   */
  FarmFieldExpenseCategory: {
    /**
     *
     */
    category(data) {
      return data;
    },
  },

  FarmFieldExpenseCategoryLineItem: {
    /**
     *
     */
    lineItem(data) {
      return data;
    },
  },

  /**
   *
   */
  FarmFieldExpenseCostsInterface: {
    total({ total: value }) {
      return round(value, 2);
    },
    perAcre({ perAcre: value }) {
      return round(value, 2);
    },
    perBushel({ perBushel: value }) {
      return round(value, 2);
    },
    fixed({ fixed: value }) {
      return round(value, 2);
    },
    variable({ variable: value }) {
      return round(value, 2);
    },
    BU({ BU: value }) {
      return round(value, 2);
    },
    pctCost({ pctCost: value }) {
      return round(value, 4);
    },
  },

  /**
   *
   */
  FarmFieldIncome: {
    avgSellingPrice({ avgSellingPrice: value }) {
      return round(value, 2);
    },
  },

  /**
   *
   */
  FarmFieldIncomeCategory: {
    /**
     *
     */
    category(data) {
      return data;
    },
  },

  /**
   *
   */
  FarmFieldIncomeValuesInterface: {
    total({ total: value }) {
      return round(value, 2);
    },
    perAcre({ perAcre: value }) {
      return round(value, 2);
    },
    perBushel({ perBushel: value }) {
      return round(value, 2);
    },
  },

  /**
   *
   */
  FarmFieldProfit: {
    total({ total: value }) {
      return round(value, 2);
    },
    perAcre({ perAcre: value }) {
      return round(value, 2);
    },
    perBushel({ perBushel: value }) {
      return round(value, 2);
    },
    margin({ margin: value }) {
      return round(value, 4);
    },
  },

  /**
   *
   */
  FarmFieldSortFieldEnum: {
    ID: '_id',
    ACRES: 'acres',
    CROP_TYPE: 'cropType',
    UPDATED_AT: 'updatedAt',
  },

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    createFarmField(_, { input }, { repos }) {
      const {
        reportId,
        name,
        cropType,
        acres,
        yieldPerAcre,
        pricePerBushel,
        premiumPerBushel,
      } = input;
      return repos.farmField.create({
        reportId,
        name,
        cropType,
        acres,
        yieldPerAcre,
        pricePerBushel,
        premiumPerBushel,
      });
    },

    /**
     *
     */
    farmFieldExpenses(_, { input }, { repos }, info) {
      const {
        fieldId,
        crop,
        fieldOps,
        handling,
      } = input;
      const projection = typeProjection(info);
      return repos.farmField.setExpenses({
        fieldId,
        crop,
        fieldOps,
        handling,
        findOptions: { projection },
      });
    },

    /**
     *
     */
    farmFieldIncome(_, { input }, { repos }, info) {
      const { fieldId, categories } = input;
      const projection = typeProjection(info);
      return repos.farmField.setIncome({
        fieldId,
        categories,
        findOptions: { projection },
      });
    },
  },

};
