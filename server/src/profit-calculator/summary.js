const { set, get } = require('@parameter1/utils');
const calculator = require('./index');
const divZero = require('../utils/div-zero');
const expenseCategories = require('./categories/expenses');

module.exports = ({ farmFields = [] } = {}) => {
  const reports = farmFields.map(calculator);

  const totals = reports.reduce((o, r) => {
    r.expenses.categories.forEach((category) => {
      const categoryPath = `expenses.categories.${category.type}.total`;
      set(o, categoryPath, get(o, categoryPath, 0) + category.costs.total);
      category.lineItems.forEach((lineItem) => {
        const liPath = `expenses.categories.${category.type}.lineItems.${lineItem.type}.total`;
        set(o, liPath, get(o, liPath, 0) + lineItem.costs.total);
      });
    });
    return {
      acres: o.acres + r.acres,
      bushels: o.bushels + r.totalBushels,
      income: o.income + r.income.total,
      expenses: {
        ...o.expenses,
        total: o.expenses.total + r.expenses.total,
      },
      profit: o.profit + r.profit.total,
    };
  }, {
    acres: 0,
    bushels: 0,
    income: 0,
    expenses: {
      total: 0,
      categories: {},
    },
    profit: 0,
  });

  const income = {
    total: totals.income,
    avgPerAcre: divZero(totals.income, totals.acres, 0),
  };

  const expenses = {
    total: totals.expenses.total,
    avgPerAcre: divZero(totals.expenses.total, totals.acres, 0),
    categories: expenseCategories.map((category) => {
      const catData = totals.expenses.categories[category.type];
      const { total } = catData;
      const costs = { total, avgPerAcre: divZero(total, totals.acres, 0) };
      return {
        costs,
        ...category,
        lineItems: category.lineItems.map((lineItem) => {
          const { total: liTotal } = catData.lineItems[lineItem.type];
          return {
            costs: { total: liTotal, avgPerAcre: divZero(liTotal, totals.acres, 0) },
            ...lineItem,
          };
        }),
      };
    }),
  };

  const profit = {
    total: totals.profit,
    avgPerAcre: divZero(totals.profit, totals.acres, 0),
    margin: divZero(totals.profit, totals.expenses.total, 1),
  };

  return {
    acres: totals.acres,
    expenses,
    income,
    profit,
  };
};
