const { getAsObject } = require('@parameter1/utils');
const divZero = require('../utils/div-zero');
const incomeCategories = require('./categories/income');
const expenseCategories = require('./categories/expenses');

/**
 * Executes a calculation for a specific crop type and # of acres.
 *
 * @param {object} params
 * @param {string} params.cropType One of corn, soy, or oleic
 * @param {number} params.acres The number of acres
 * @param {number} params.totalBushels The total number of bushels produced
 * @param {number} params.revenuePerBushel The market price + premium per bushel (less other income)
 *                                         Needs to be a weighted average when running all fields
 * @param {object} params.income The income inputs
 * @param {object} params.expenses The expense inputs
 * @todo this currently doesn't handle 0 acres
 */
module.exports = (params = {}) => {
  const {
    cropType,
    acres,
    totalBushels,
    revenuePerBushel = 0,
  } = params;
  const inputs = {
    income: getAsObject(params.income),
    expenses: getAsObject(params.expenses),
  };

  const miscIncome = (inputs.income.govtPayment || 0) + (inputs.income.other || 0);
  const avgSellingPrice = (
    ((revenuePerBushel || 0) * totalBushels) + miscIncome
  ) / totalBushels;
  const totalIncome = avgSellingPrice * totalBushels;
  const income = {
    total: totalIncome,
    perAcre: totalIncome / acres,
    perBushel: totalIncome / totalBushels,
    avgSellingPrice,
    categories: incomeCategories.map((category) => {
      const total = inputs.income[category.type] || 0;
      return {
        ...category,
        income: {
          total,
          perAcre: total / acres,
          perBushel: total / totalBushels,
        },
      };
    }),
  };

  const expensesByCategory = expenseCategories.map((category) => {
    const input = getAsObject(inputs, `expenses.${category.type}`);
    const lineItems = category.lineItems.filter(({ when }) => {
      if (!when) return true;
      return when({ cropType });
    }).map((lineItem) => {
      const costPer = input[lineItem.type] || 0;
      // convert cost to per acre.
      const perAcre = category.unit === 'perBushel' ? (costPer * totalBushels) / acres : costPer;
      const total = perAcre * acres;
      const costs = {
        total,
        perAcre,
        perBushel: total / totalBushels,
        fixed: lineItem.fixed ? total : 0,
        variable: lineItem.fixed ? 0 : total,
        BU: perAcre / revenuePerBushel,
      };
      return {
        ...lineItem,
        fixed: Boolean(lineItem.fixed),
        costs,
      };
    });

    const costs = lineItems.reduce((o, lineItem) => {
      const { fixed, variable } = o;
      return {
        total: o.total + lineItem.costs.total,
        perAcre: o.perAcre + lineItem.costs.perAcre,
        perBushel: o.perBushel + (lineItem.costs.total / totalBushels),
        fixed: lineItem.fixed ? fixed + lineItem.costs.total : fixed,
        variable: !lineItem.fixed ? variable + lineItem.costs.total : variable,
      };
    }, {
      total: 0,
      perAcre: 0,
      perBushel: 0,
      fixed: 0,
      variable: 0,
    });

    return {
      ...category,
      lineItems,
      costs: {
        ...costs,
        BU: costs.perAcre / revenuePerBushel,
      },
    };
  });

  const expenses = expensesByCategory.reduce((o, category) => {
    const { costs } = category;
    return {
      total: o.total + costs.total,
      perAcre: o.perAcre + costs.perAcre,
      perBushel: o.perBushel + (costs.total / totalBushels),
      fixed: o.fixed + costs.fixed,
      variable: o.variable + costs.variable,
    };
  }, {
    total: 0,
    perAcre: 0,
    perBushel: 0,
    fixed: 0,
    variable: 0,
  });

  const totalProfit = income.total - expenses.total;
  const profit = {
    total: totalProfit,
    perAcre: totalProfit / acres,
    perBushel: totalProfit / totalBushels,
  };

  const expenseCategoryReport = expensesByCategory.map((category) => ({
    // add percent cost for entire expense category
    ...category,
    costs: { ...category.costs, pctCost: divZero(category.costs.total, expenses.total, 0) },
    // add percent cost to each category line item
    lineItems: category.lineItems.map((lineItem) => ({
      ...lineItem,
      costs: { ...lineItem.costs, pctCost: divZero(lineItem.costs.total, expenses.total, 0) },
    })),
  }));

  return {
    cropType,
    acres,
    totalBushels,
    expenses: {
      ...expenses,
      BU: expenses.perAcre / revenuePerBushel,
      pctCost: 1,
      categories: expenseCategoryReport,
    },
    income,
    profit: {
      ...profit,
      margin: divZero(profit.total, expenses.total, 1),
    },
  };
};
