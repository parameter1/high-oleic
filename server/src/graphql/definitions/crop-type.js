const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  cropTypes(input: CropTypesQueryInput = {}): [CropType!]!
}

enum CropTypeEnum {
  "Corn crop."
  CORN
  "Soybean crop."
  SOY
  "Wheat crop."
  WHEAT
  "High-Oleic soybean crop."
  OLEIC
}

type CropType {
  "The crop type ID/type."
  id: CropTypeEnum!
  "The crop label"
  label: String!
}

input CropTypesQueryInput {
  "Crop types to exclude."
  exclude: [CropTypeEnum!] = []
}

`;
