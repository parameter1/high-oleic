const { gql } = require('apollo-server-express');

module.exports = gql`

interface UserAttributionInterface {
  "The user who created the record."
  createdBy: User! @project(field: "createdByEmail")
}

type User {
  "The internal, unique user identifier."
  id: ObjectID!
  "The user's email address."
  email: String!
}

`;
