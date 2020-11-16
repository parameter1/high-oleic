const incomeCategories = require('../../profit-calculator/categories/income');

module.exports = {
  /**
   *
   */
  IncomeCategory: {
    /**
     *
     */
    id({ type }) {
      return type;
    },
  },

  /**
   *
   */
  IncomeCategoryTypeEnum: {
    GOVT_PAYMENT: 'govtPayment',
    OTHER: 'other',
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    incomeCategories(_, { input }) {
      const { types } = input;
      if (!types.length) return incomeCategories;
      return incomeCategories.filter((category) => types.includes(category.type));
    },
  },
};
