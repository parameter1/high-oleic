const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Mutation {
  "Creates a new farm field within a report."
  createFarmField(input: CreateFarmFieldMutationInput!): FarmField!
  "Sets expenses for a farm field."
  farmFieldExpenses(input: FarmFieldExpensesMutationInput!): FarmField!
  "Sets income for a farm field."
  farmFieldIncome(input: FarmFieldIncomeMutationInput!): FarmField!
}

interface FarmFieldExpenseCostsInterface {
  "The total expense, in dollars."
  total: Float!
  "The total expense per acre."
  perAcre: Float!
  "The total expense per bushel."
  perBushel: Float!
  "The total fixed expense, in dollars."
  fixed: Float!
  "The total variable expense, in dollars."
  variable: Float!
  "The number of bushels needed to cover the expense."
  BU: Float!
  "The percentage of this cost versus total expenses."
  pctCost: Float!
}

interface FarmFieldIncomeValuesInterface {
  "The total income, in dollars."
  total: Float!
  "The total income per acre."
  perAcre: Float!
  "The total income per bushel."
  perBushel: Float!
}

type FarmField {
  "The internal, unique farm field identifier."
  id: ObjectID! @project(field: "_id")
  "The (optional) name of the field."
  name: String @project
  "The crop type grown in the field."
  cropType: CropTypeEnum! @project
  "The number of acres."
  acres: Float! @project
  "The crop yield per acre, in bushels"
  yieldPerAcre: Float! @project
  "The total number of bushels harvested in this field."
  totalBushels: Float! @project

  "The crop's market price per bushel, in dollars."
  pricePerBushel: Float! @project
  "The crop's premium price per bushel, in dollars."
  premiumPerBushel: Float! @project
  "The crop's total revenue per bushel, in dollars. This is the sum of the price and premium per bushel, and excludes other income."
  revenuePerBushel: Float! @project


  "The farm field expenses."
  expenses: FarmFieldExpenses! @project(field: "expenses", needs: ["cropType", "acres", "totalBushels", "revenuePerBushel", "income"])
  "The farm field income."
  income: FarmFieldIncome! @project(field: "expenses", needs: ["cropType", "acres", "totalBushels", "revenuePerBushel", "income"])
  "The farm field profit."
  profit: FarmFieldProfit! @project(field: "expenses", needs: ["cropType", "acres", "totalBushels", "revenuePerBushel", "income"])
  "The report that this farm field belongs to."
  report: Report! @project
}

type FarmFieldConnection @projectUsing(type: "FarmField") {
  "The total number of records found in the query."
  totalCount: Int!
  "An array of edge objects containing the record and the cursor."
  edges: [FarmFieldEdge]!
  "Contains the pagination info for this query."
  pageInfo: PageInfo!
}

type FarmFieldEdge {
  "The edge result node."
  node: FarmField!
  "The opaque cursor value for this record edge."
  cursor: String!
}

"""
The expenses for an entire farm field.
"""
type FarmFieldExpenses implements FarmFieldExpenseCostsInterface @interfaceFields {
  "Expense by category breakout."
  categories: [FarmFieldExpenseCategory!]!
}

type FarmFieldExpenseCosts implements FarmFieldExpenseCostsInterface @interfaceFields {
  "The total expense, in dollars."
  total: Float!
}

"""
The expenses, per category, of a farm field.
"""
type FarmFieldExpenseCategory {
  "The expense category."
  category: ExpenseCategory!
  "The costs of the category."
  costs: FarmFieldExpenseCosts!
  "The line item costs."
  lineItems: [FarmFieldExpenseCategoryLineItem!]!
}

"""
The expenses, per line item of a category, of a farm field.
"""
type FarmFieldExpenseCategoryLineItem {
  "The expense category line item."
  lineItem: ExpenseCategoryLineItem!
  "The costs of the line item."
  costs: FarmFieldExpenseCosts!
}

type FarmFieldIncomeValues implements FarmFieldIncomeValuesInterface @interfaceFields {
  "The total income, in dollars."
  total: Float!
}

"""
The income for an entire farm field.
"""
type FarmFieldIncome implements FarmFieldIncomeValuesInterface @interfaceFields {
  "The average selling price of each bushel."
  avgSellingPrice: Float!
  "Income by category breakdown."
  categories: [FarmFieldIncomeCategory!]!
}

"""
The income, per category, of a farm field.
"""
type FarmFieldIncomeCategory {
  "The income category."
  category: IncomeCategory!
  "The income from this category."
  income: FarmFieldIncomeValues!
}

"""
The profit for an entire farm field.
"""
type FarmFieldProfit {
  "The total profit, in dollars."
  total: Float!
  "The total profit per acre."
  perAcre: Float!
  "The total profit per bushel."
  perBushel: Float!
  "The margin / ROI of the field."
  margin: Float!
}

enum FarmFieldSortFieldEnum {
  ID
  ACRES
  CROP_TYPE
  UPDATED_AT
}

input CreateFarmFieldMutationInput {
  "The report to add the farm field to."
  reportId: ObjectID!
  "The (optional) name of the farm field."
  name: String
  "The crop type grown in the field."
  cropType: CropTypeEnum!
  "The number of acres."
  acres: Float!
  "The crop yield per acre, in bushels"
  yieldPerAcre: Float!
  "The crop's market price per bushel."
  pricePerBushel: Float!
  "The crop's premium price per bushel."
  premiumPerBushel: Float
}

input FarmFieldCropExpenseInput {
  "The crop expense category line item."
  lineItem: ExpenseCategoryCropLineItemEnum!
  "The expense in $ cost / acre."
  value: Float!
}

input FarmFieldFieldOpsExpenseInput {
  "The field ops expense category line item."
  lineItem: ExpenseCategoryFieldOpsLineItemEnum!
  "The expense in $ cost / acre."
  value: Float!
}

input FarmFieldHandlingExpenseInput {
  "The handling expense category line item."
  lineItem: ExpenseCategoryHandlingLineItemEnum!
  "The expense in $ cost / bushel."
  value: Float!
}

input FarmFieldExpensesMutationInput {
  "The farm field to add the expense to."
  fieldId: ObjectID!
  "Crop expenses to set."
  crop: [FarmFieldCropExpenseInput!] = []
  "Field operation expenses to set."
  fieldOps: [FarmFieldFieldOpsExpenseInput!] = []
  "Handling expenses to set."
  handling: [FarmFieldHandlingExpenseInput!] = []
}

input FarmFieldIncomeInput {
  "The income category type."
  type: IncomeCategoryTypeEnum!
  "The income total value."
  value: Float!
}

input FarmFieldIncomeMutationInput {
  "The farm field to add the income to."
  fieldId: ObjectID!
  "The income categories to set."
  categories: [FarmFieldIncomeInput!] = []
}

`;
