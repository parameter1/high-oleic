const { gql } = require('apollo-server-express');

module.exports = gql`

type Query {
  ping: String!
}

type Mutation {
  ping: String!
}

`;
