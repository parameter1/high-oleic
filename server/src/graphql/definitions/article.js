const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Finds a single article by slug."
  articleSlug(input: ArticleSlugQueryInput!): Article
}

type Article {
  "The internal, unique article identifier."
  id: String!
  "The article slug."
  slug: String!
  "The article title."
  title: String!
  "The article teaser."
  teaser: String
  "The article body."
  body: String!
}

input ArticleSlugQueryInput {
  "The slug to lookup."
  slug: String!
  "Whether to enable strict mode. When enabled (default), if an article cannot be found an error is thrown."
  strict: Boolean = true
}

`;
