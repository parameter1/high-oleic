import gql from 'graphql-tag';
import {
  CROP_COMPARISON_REPORT_FRAGMENT,
  CROP_COMPARISON_FARM_INFO_FRAGMENT,
  CROP_COMPARISON_YIELD_AND_PRICE_FRAGMENT,
} from './fragments';

export const LOAD_ARTICLE = gql`
  query LoadArticle($slug: String!) {
    article: articleSlug(input: { slug: $slug }) {
      id
      title
      body
    }
  }
`;

export const LOOKUP_ELEVATORS = gql`
  query LookupElevators($input: GrainElevatorsNearPostalCodeQueryInput!) {
    grainElevatorsNearPostalCode(input: $input) {
      distance(input: { round: 1 })
      elevator {
        id
        name
        street
        city
        regionCode
        postalCode
        countryCode
        contactName
        phoneNumber
        phoneNumber2
        deliveryWindow
        googleMapsUrl
      }
    }
  }
`;

export const LOOKUP_USER = gql`
  query LookupUser($email: String!) {
    appUser(input: { email: $email }) {
      id
      email
    }
  }
`;

export const LIST_CROP_COMPARISONS = gql`
  query ListCropComparisons($input: MyCropComparisonsQueryInput = {}) {
    myCropComparisons(input: $input) {
      totalCount
      edges {
        node {
          id
          farmName
          acres
          advantage
          ratio
          createdAt
          updatedAt
          comparedTo {
            id
            crop {
              id
              label
            }
          }
          oleic {
            id
            crop {
              id
              label
            }
            profit {
              margin
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const CROP_COMPARISON_REPORT = gql`
  query CropComparisonReport($id: ObjectID!) {
    cropComparison(input: { id: $id }) {
      ...CropComparisonReportFragment
    }
  }

  ${CROP_COMPARISON_REPORT_FRAGMENT}
`;

export const PUBLIC_CROP_COMPARISON_REPORT = gql`
  query PublicCropComparisonReport($id: String!) {
    publicCropComparison(input: { id: $id }) {
      ...CropComparisonReportFragment
    }
  }

  ${CROP_COMPARISON_REPORT_FRAGMENT}
`;

export const CROP_COMPARISON_FARM_INFO = gql`
  query CropComparisonFarmInfo($id: ObjectID!) {
    cropComparison(input: { id: $id }) {
      ...CropComparisonFarmInfoFragment
    }
  }

  ${CROP_COMPARISON_FARM_INFO_FRAGMENT}
`;

export const CROP_COMPARISON_YIELD_AND_PRICE = gql`
  query CropComparisonYieldAndPrice($id: ObjectID!) {
    cropComparison(input: { id: $id }) {
      ...CropComparisonYieldAndPriceFragment
    }
  }

  ${CROP_COMPARISON_YIELD_AND_PRICE_FRAGMENT}
`;

export const CROP_COMPARISON_EXPENSES = gql`
  query CropComparisonExpenses($id: ObjectID!) {
    cropComparison(input: { id: $id }) {
      ...CropComparisonReportFragment
    }
  }

  ${CROP_COMPARISON_REPORT_FRAGMENT}
`;

export const MODIFY_COMPARISON_ROOT = gql`
  query ModifyComparisonRoot($id: ObjectID!) {
    cropComparison(input: { id: $id }) {
      id
      acres
      farmName
      updatedAt
      comparedTo {
        id
        crop {
          id
          label
        }
      }
      oleic {
        id
        crop {
          id
          label
        }
      }
    }
  }
`;
