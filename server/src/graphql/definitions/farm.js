const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Finds a single farm by ID."
  farm(input: FarmQueryInput!): Farm
}

extend type Mutation {
  "Creates a new farm."
  createFarm(input: CreateFarmMutationInput!): Farm!
}

enum FarmSortFieldEnum {
  ID
  NAME
  UPDATED_AT
}

type Farm implements ChangedDateInterface @interfaceFields {
  "The internal, unique farm identifier."
  id: ObjectID! @project(field: "_id")
  "The name of the farm."
  name: String! @project
  "The postal code of the farm."
  postalCode: String! @project
  "Calculator reports associated with this farm."
  reports(input: FarmReportsInput = {}): ReportConnection! @project(field: "_id")
}

type FarmConnection @projectUsing(type: "Farm") {
  "The total number of records found in the query."
  totalCount: Int!
  "An array of edge objects containing the record and the cursor."
  edges: [FarmEdge]!
  "Contains the pagination info for this query."
  pageInfo: PageInfo!
}

type FarmEdge {
  "The edge result node."
  node: Farm!
  "The opaque cursor value for this record edge."
  cursor: String!
}

input FarmSortInput {
  "The field to sort by."
  field: FarmSortFieldEnum
  "The sort order, either \`DESC\` or \`ASC\`"
  order: SortOrderEnum
}

input CreateFarmMutationInput {
  "The name of the farm."
  name: String!
  "The postal code of the farm."
  postalCode: String!
}

input FarmQueryInput {
  "The farm ID to query for."
  id: ObjectID
  "When in strict mode (default), the query will throw an error when the user is not found."
  strict: Boolean = true
}

input FarmReportsInput {
  "Sets sorting criteria for the query."
  sort: ReportSortInput
  "Sets pagination (limit/after) criteria for the query."
  pagination: PaginationInput = {}
}

`;
