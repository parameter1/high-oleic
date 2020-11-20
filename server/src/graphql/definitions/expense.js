const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Lists all expense categories for the provided input."
  expenseCategories(input: ExpenseCategoriesQueryInput = {}): [ExpenseCategory!]!
}

enum ExpenseCategoryTypeEnum {
  "Crop expenses."
  CROP
  "Chemical expenses."
  CHEMICALS
  "Field operation expenses."
  FIELD_OPS
  "Grain handling expenses."
  HANDLING
}

enum ExpenseCategoryCropLineItemEnum {
  "Land crop expense line item."
  LAND
  "Tax crop expense line item."
  TAX
  "Return to management crop expense line item."
  RTM
  "Operating interest crop expense line item."
  INTEREST
  "Insurance crop expense line item."
  INSURANCE
  "Seed crop expense line item."
  SEEDS
  "Fertilizer and lime crop expense line item."
  FERT_LIME
  "Nitrogen crop expense line item."
  NITROGEN
  # "Chemical crop expense line item."
  # CHEMICALS
}

enum ExpenseCategoryChemicalsLineItemEnum {
  "Herbicides chemical expense line item."
  HERBICIDE
  "Insecticides/fungicide chemical expense line item."
  INSECTICIDE
}

enum ExpenseCategoryFieldOpsLineItemEnum {
  # "Nitrogen application field ops expense line item."
  # NITROGEN
  # "Cultivation field ops expense line item."
  # CULTIVATION
  # "Planter field ops expense line item."
  # PLANTER
  # "Drill field ops expense line item."
  # DRILL
  "Sprayer (2/3 pass) field ops expense line item."
  SPRAYER
  "Equipment field ops expense line item."
  EQUIPMENT
  # "Combine field ops expense line item."
  # COMBINE
  # "VRT field ops expense line item."
  # VRT
  "Other field ops expense line item."
  OTHER
}

enum ExpenseCategoryHandlingLineItemEnum {
  "Hauling handling expense line item."
  HAULING
  "Dryer handling expense line item."
  DRYER
  "Storage handling expense line item."
  STORAGE
}


type ExpenseCategory {
  "The expense category ID. Is equivelant to the type."
  id: String!
  "The expenses category type."
  type: ExpenseCategoryTypeEnum!
  "The expense category label"
  label: String!
  "The expense category description"
  description: String
  "The expected input cost unit, e.g. cost per acre or cost per bushel."
  unit: CurrencyUnitEnum!
  "Expense line items belong to this category."
  lineItems(input: ExpenseCategoryLineItemsInput = {}): [ExpenseCategoryLineItem!]!
}

type ExpenseCategoryLineItem {
  "The expense line item ID. Is a combination of the category type and the line item type."
  id: String!
  "The expense line item type, e.g. land or tax."
  type: String!
  "The expense line item label"
  label: String!
  "The expense line item description"
  description: String
  "The expected input cost unit, e.g. cost per acre or cost per bushel."
  unit: CurrencyUnitEnum!
  "Whether the cost is considered fixed."
  fixed: Boolean!
}

type ExpenseCategoryCosts {
  "The expense category."
  category: ExpenseCategory!
  "The costs of the category."
  costs: FarmFieldExpenseCosts!
}

type ExpenseCategoryLineItemCost {
  lineItem: ExpenseCategoryLineItem!
  total: Float!
  perAcre: Float!
  perBushel: Float!
  pctCost: Float!
  BU: Float!
}

input ExpenseCategoriesQueryInput {
  "Filters the returned expenses by category type."
  types: [ExpenseCategoryTypeEnum!] = []
}

input ExpenseCategoryLineItemsInput {
  "Filters the category line items by crop type"
  cropType: CropTypeEnum
}

`;
