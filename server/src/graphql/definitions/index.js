const { gql } = require('apollo-server-express');
const projectDirectives = require('@parameter1/graphql-directive-project/directives');
const formatDateDirectives = require('@parameter1/graphql-directive-format-date/directives');
const interfaceDirectives = require('@parameter1/graphql-directive-interface-fields/directives');
const pagination = require('@parameter1/graphql-mongodb-pagination/definitions');

const crop = require('./crop');
const cropComparison = require('./crop-comparison');
const expense = require('./expense');
const farm = require('./farm');
const farmField = require('./farm-field');
const grainElevator = require('./grain-elevator');
const income = require('./income');
const report = require('./report');
const user = require('./user');

module.exports = gql`

${projectDirectives.typeDefs}
${formatDateDirectives.typeDefs}
${interfaceDirectives.typeDefs}

scalar Date
scalar ObjectID

${pagination}

enum CurrencyUnitEnum {
  "Represents a value in dollars per acre."
  PER_ACRE
  "Represents a value in dollars per bushel."
  PER_BUSHEL
  "Represents a flat dollar value for the season."
  FLAT
}

interface ChangedDateInterface {
  "The timestamp (in milliseconds) when the record was created."
  createdAt: Date! @project
  "The timestamp (in milliseconds) when the record was last updated."
  updatedAt: Date! @project
  "A formattable, string date when the record was created."
  createdDate(input: FormatDateInput = {}): String!
    @formatDate(field: "createdAt", inputArg: "input")
    @project(field: "createdAt")
  "A formattable, string date when the record was last updated."
  updatedDate(input: FormatDateInput = {}): String!
    @formatDate(field: "updatedAt", inputArg: "input")
    @project(field: "updatedAt")
}

type Query {
  ping: String!
}

type Mutation {
  ping: String!
}

${crop}
${cropComparison}
${expense}
${farm}
${farmField}
${grainElevator}
${income}
${report}
${user}

`;
