import gql from 'graphql-tag';

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
            crop {
              id
              label
            }
          }
          oleic {
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
