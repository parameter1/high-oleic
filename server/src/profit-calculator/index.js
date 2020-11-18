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
 * @param {number} params.yieldPerAcre The yield per acre, in bushels
 * @param {number} params.pricePerBushel The price per bushel, in dollars
 * @param {number} params.premiumPerBushel The premium per bushel, in dollars
 * @param {object} params.income The income inputs
 * @param {object} params.expenses The expense inputs
 * @todo this currently doesn't handle 0 acres
 */
module.exports = (params = {}) => {
  const {
    cropType,
    acres = 0,
    yieldPerAcre = 0,
    pricePerBushel = 0,
    premiumPerBushel = 0,
  } = params;
  const inputs = {
    income: getAsObject(params.income),
    expenses: getAsObject(params.expenses),
  };

  const totalBushels = yieldPerAcre * acres;
  const revenuePerBushel = pricePerBushel + premiumPerBushel;

  const miscIncome = (inputs.income.govtPayment || 0) + (inputs.income.other || 0);
  const avgSellingPrice = divZero((
    ((revenuePerBushel || 0) * totalBushels) + miscIncome
  ), totalBushels, 0);
  const totalIncome = avgSellingPrice * totalBushels;
  const income = {
    total: totalIncome,
    perAcre: divZero(totalIncome, acres, 0),
    perBushel: divZero(totalIncome, totalBushels, 0),
    avgSellingPrice,
    categories: incomeCategories.map((category) => {
      const total = inputs.income[category.type] || 0;
      return {
        ...category,
        income: {
          total,
          perAcre: divZero(total, acres, 0),
          perBushel: divZero(total, totalBushels, 0),
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
        perBushel: divZero(total, totalBushels, 0),
        fixed: lineItem.fixed ? total : 0,
        variable: lineItem.fixed ? 0 : total,
        BU: divZero(perAcre, revenuePerBushel, 0),
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
        perBushel: o.perBushel + (divZero(lineItem.costs.total, totalBushels, 0)),
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
        BU: divZero(costs.perAcre, revenuePerBushel, 0),
      },
    };
  });

  const expenses = expensesByCategory.reduce((o, category) => {
    const { costs } = category;
    return {
      total: o.total + costs.total,
      perAcre: o.perAcre + costs.perAcre,
      perBushel: o.perBushel + (divZero(costs.total, totalBushels, 0)),
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
    perAcre: divZero(totalProfit, acres, 0),
    perBushel: divZero(totalProfit, totalBushels, 0),
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
      BU: divZero(expenses.perAcre, revenuePerBushel, 0),
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
