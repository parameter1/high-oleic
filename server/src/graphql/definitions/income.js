const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Lists all income categories for the provided input."
  incomeCategories(input: IncomeCategoriesQueryInput = {}): [IncomeCategory!]!
}

enum IncomeCategoryTypeEnum {
  "Government payment income."
  GOVT_PAYMENT
  "Other income."
  OTHER
}

type IncomeCategory {
  "The income category ID. Is a combination of the crop type and the category type."
  id: String!
  "The income category type."
  type: IncomeCategoryTypeEnum!
  "The income category label."
  label: String!
  "The income category description."
  description: String
  "The expected input cost unit, e.g. cost per acre or cost per bushel."
  unit: CurrencyUnitEnum!
}

input IncomeCategoriesQueryInput {
  # "Filters the returned income by crop type."
  # cropTypes: [CropTypeEnum!] = []
  "Filters the returned income by category."
  types: [IncomeCategoryTypeEnum!] = []
}

`;
