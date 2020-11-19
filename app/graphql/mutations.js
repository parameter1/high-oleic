import gql from 'graphql-tag';
import { CROP_COMPARISON_REPORT_FRAGMENT } from './fragments';

export const AUTHENTICATE = gql`
  mutation Authenticate($token: String!) {
    loginAppUser(input: { token: $token }) {
      token {
        id
        value
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($email: String!) {
    createAppUser(input: { email: $email }) {
      id
      email
    }
  }
`;

export const SEND_LOGIN_LINK = gql`
  mutation SendLoginLink($input: SendAppUserLoginLinkMutationInput!) {
    sendAppUserLoginLink(input: $input)
  }
`;

export const CREATE_CROP_COMPARISON = gql`
  mutation CreateCropComparison($input: CreateCropComparisonMutationInput!) {
    createCropComparison(input: $input) {
      id
    }
  }
`;

export const UPDATE_COMPARISON_ACRES = gql`
  mutation UpdateComparisonAcres($input: CropComparisonAcresMutationInput!) {
    cropComparisonAcres(input: $input) {
      ...CropComparisonReportFragment
    }
  }

  ${CROP_COMPARISON_REPORT_FRAGMENT}
`;
