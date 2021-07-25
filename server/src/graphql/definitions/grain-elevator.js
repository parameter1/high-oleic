const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Finds grain elevators near the provided postal code and distance."
  grainElevatorsNearPostalCode(input: GrainElevatorsNearPostalCodeQueryInput!): [GrainElevatorNearPostalCode!]!
}

type GrainElevator {
  "The internal, unique elevator identifier."
  id: ObjectID! @project(field: "_id")
  "The 'owning' grain/seed affiliate, e.g. ADM or Bunge"
  affiliate: String!
  "The elevator company name."
  companyName: String!
  "The street address of the elevator."
  street: String!
  "The city the elevator resides in."
  city: String!
  "The region (state) code of the elevator."
  regionCode: String!
  "The postal code of the elevator."
  postalCode: String!
  "The country code of the elevator."
  countryCode: String!
  "The contact person at the elevator location."
  contactName: String
  "The phone number of the contact and/or elevator."
  phoneNumber: String
  "The alternate phone number of the contact and/or elevator."
  phoneNumber2: String
  "The elevator's delivery window"
  deliveryWindow: String
}

type GrainElevatorNearPostalCode {
  "The grain elevator."
  elevator: GrainElevator!
  "The distance (in miles) from the provided postal code."
  distance: Float!
}

input GrainElevatorsNearPostalCodeQueryInput {
  "The postal code to find elevators that are near."
  postalCode: String!
  "The max search distance radius, in miles. Cannot be less than one mile."
  maxDistance: Float!
}

`;
