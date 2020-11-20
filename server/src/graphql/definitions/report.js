const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Finds a single report by ID."
  report(input: ReportQueryInput!): Report
}

extend type Mutation {
  "Creates a new report for a farm."
  createReport(input: CreateReportMutationInput!): Report!
}

enum ReportSortFieldEnum {
  ID
  NAME
  UPDATED_AT
  FARM_NAME
}

type Report implements ChangedDateInterface @interfaceFields {
  "The internal, unqiue report report identifier."
  id: ObjectID! @project(field: "_id")
  "The (optional) name of the report."
  name: String @project
  "The growing season of the report, e.g. 2020 - 2021"
  growingSeason: ReportGrowingSeason! @project
  "The farm that owns this report."
  farm: Farm! @project
  "The farm fields owned by this report."
  farmFields: FarmFieldConnection! @project(field: "_id")
  "The farm report summary."
  summary: ReportSummary @project(field: "_id")
}

type ReportSummary {
  "The total number of acres of all farm fields."
  acres: Float!
  "The farm expenses."
  expenses: ReportExpenseSummary!
  "The farm income."
  income: ReportIncomeSummary!
  "The farm profit."
  profit: ReportProfitSummary!
}

type ReportExpenseSummary {
  "The total expense, in dollars."
  total: Float!
  "The average expense per acre."
  avgPerAcre: Float!
  "Expenses for each category."
  categories: [ReportExpenseCategorySummary!]!
}

type ReportExpenseCategorySummary {
  "The expense category."
  category: ExpenseCategory!
  "The total expense for this category, in dollars."
  total: Float!
  "The average expense for this category, per acre."
  avgPerAcre: Float!
  "Expenses for each line item in this category."
  lineItems: [ReportExpenseCategoryLineItemSummary!]!
}

type ReportExpenseCategoryLineItemSummary {
  "The expense line item."
  lineItem: ExpenseCategoryLineItemInterface!
  "The total line item expense, in dollars."
  total: Float!
  "The average line item expense, per acre."
  avgPerAcre: Float!
}

type ReportIncomeSummary {
  "The total income, in dollars."
  total: Float!
  "The average income per acre."
  avgPerAcre: Float!
}

type ReportProfitSummary {
  "The total profit, in dollars."
  total: Float!
  "The average profit per acre."
  avgPerAcre: Float!
  "The total profit margin."
  margin: Float!
}

type ReportConnection @projectUsing(type: "Report") {
  "The total number of records found in the query."
  totalCount: Int!
  "An array of edge objects containing the record and the cursor."
  edges: [ReportEdge]!
  "Contains the pagination info for this query."
  pageInfo: PageInfo!
}

type ReportEdge {
  "The edge result node."
  node: Report!
  "The opaque cursor value for this record edge."
  cursor: String!
}

type ReportGrowingSeason {
  "The start of the growing season."
  start: Date!
  "The end of the growing season."
  end: Date!
}

input ReportSortInput {
  "The field to sort by."
  field: ReportSortFieldEnum
  "The sort order, either \`DESC\` or \`ASC\`"
  order: SortOrderEnum
}

input CreateReportMutationInput {
  "The farm to assign this report to."
  farmId: ObjectID!
  "The (optional) name of the report."
  name: String
  "The growing seasion of the report."
  growingSeason: GrowingSeasonMutationInput!
}

input GrowingSeasonMutationInput {
  "The start of the growing season."
  start: Date!
  "The end of the growing season."
  end: Date!
}

input ReportQueryInput {
  "The report ID to query for."
  id: ObjectID
  "When in strict mode (default), the query will throw an error when the user is not found."
  strict: Boolean = true
}

`;
