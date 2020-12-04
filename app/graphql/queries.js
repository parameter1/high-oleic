import gql from 'graphql-tag';
import { CROP_COMPARISON_REPORT_FRAGMENT } from './fragments';

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

export const MODIFY_COMPARISON_FARM_INFO = gql`
  query ModifyComparisonFarmInfo($id: ObjectID!) {
    cropComparison(input: { id: $id }) {
      id
      acres
      farmName
      comparedTo {
        id
        cropType
        crop {
          id
          label
        }
        pricePerBushel
        yieldPerAcre
      }
    }
  }
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
