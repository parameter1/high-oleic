const Joi = require('../joi');
const { fields: reportFields } = require('./report');
const { fields: cropTypeFields } = require('./crop-type');
const expenses = require('../profit-calculator/categories/expenses');
const income = require('../profit-calculator/categories/income');

const getLineItemTypes = (categoryType) => expenses
  .find(({ type }) => (type === categoryType))
  .lineItems.map(({ type }) => type);

const expensesCategories = expenses.map(({ type }) => type);
const incomeCategories = income.map(({ type }) => type);

const cropExpenseLineItems = getLineItemTypes('crop');
const fieldOpsExpenseLineItems = getLineItemTypes('fieldOps');
const handlingExpenseLineItems = getLineItemTypes('handling');

const fields = {
  id: Joi.mongoId(),
  reportId: reportFields.id,
  name: Joi.string().trim(),
  cropType: cropTypeFields.cropType,
  acres: Joi.number().min(1),
  yieldPerAcre: Joi.number().min(1), // in bushels :: REQUIRED

  pricePerBushel: Joi.number().min(0), // in dollars :: REQUIRED
  premiumPerBushel: Joi.number().min(0), // in dollars

  expenseCategory: Joi.string().trim().valid(...expensesCategories),
  incomeCategory: Joi.string().trim().valid(...incomeCategories),

  cropExpenseLineItems: Joi.string().trim().valid(...cropExpenseLineItems),
  fieldOpsExpenseLineItems: Joi.string().trim().valid(...fieldOpsExpenseLineItems),
  handlingExpenseLineItems: Joi.string().trim().valid(...handlingExpenseLineItems),

  expenseValue: Joi.number().min(0),
  incomeValue: Joi.number().min(0),
};

module.exports = {
  fields,
  expensesCategories,
  incomeCategories,
};
