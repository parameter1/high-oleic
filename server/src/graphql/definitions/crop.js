const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  crops(input: CropsQueryInput = {}): [Crop!]!
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

enum ComparisonCropTypeEnum {
  "Corn crop."
  CORN
  "Soybean crop."
  SOY
  "Wheat crop."
  WHEAT
}

type Crop {
  "The crop type ID/type."
  id: CropTypeEnum!
  "The crop label"
  label: String!
}

input CropsQueryInput {
  "Crop types to exclude."
  exclude: [CropTypeEnum!] = []
}

`;
