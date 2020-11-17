const { typeProjection } = require('@parameter1/graphql-directive-project/utils');
const calculator = require('../../profit-calculator');
const round = require('../../utils/round');
const { getCropTypes } = require('../../schema/crop-type');

module.exports = {
  /**
   *
   */
  FarmFieldDataInterface: {
    /**
     *
     */
    crop({ cropType }) {
      return getCropTypes().find(({ type }) => cropType === type);
    },

    /**
     *
     */
    expenses(data) {
      return calculator(data).expenses;
    },

    /**
     *
     */
    income(data) {
      return calculator(data).income;
    },

    /**
     *
     */
    profit(data) {
      return calculator(data).profit;
    },

    /**
     *
     */
    premiumPerBushel({ premiumPerBushel }) {
      return round(premiumPerBushel || 0, 2);
    },

    /**
     *
     */
    pricePerBushel({ pricePerBushel }) {
      return round(pricePerBushel || 0, 2);
    },

    /**
     *
     */
    revenuePerBushel({ revenuePerBushel }) {
      return round(revenuePerBushel || 0, 2);
    },

    /**
     *
     */
    totalBushels({ totalBushels }) {
      return round(totalBushels || 0, 2);
    },

    /**
     *
     */
    yieldPerAcre({ yieldPerAcre }) {
      return round(yieldPerAcre || 0, 2);
    },
  },

  /**
   *
   */
  FarmField: {
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
