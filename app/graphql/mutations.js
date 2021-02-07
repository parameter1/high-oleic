import gql from 'graphql-tag';
import {
  CROP_COMPARISON_REPORT_FRAGMENT,
  CROP_COMPARISON_YIELD_AND_PRICE_FRAGMENT,
} from './fragments';

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

export const LOGOUT = gql`
  mutation Logout($token: String!) {
    logoutAppUser(input: { token: $token })
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

export const UPDATE_COMPARISON_REPORT_ACRES = gql`
  mutation UpdateComparisonReportAcres($input: CropComparisonAcresMutationInput!) {
    cropComparisonAcres(input: $input) {
      ...CropComparisonReportFragment
    }
  }

  ${CROP_COMPARISON_REPORT_FRAGMENT}
`;

export const UPDATE_COMPARISON_REPORT_FARM_NAME = gql`
  mutation UpdateComparisonReportFarmName($input: CropComparisonFarmNameMutationInput!) {
    cropComparisonFarmName(input: $input) {
      ...CropComparisonReportFragment
    }
  }

  ${CROP_COMPARISON_REPORT_FRAGMENT}
`;

export const UPDATE_COMPARISON_REPORT_YIELD_PER_ACRE = gql`
  mutation UpdateComparisonReportYieldPerAcre($input: CropComparisonDataMutationInput!) {
    cropComparisonData(input: $input) {
      ...CropComparisonReportFragment
    }
  }

  ${CROP_COMPARISON_REPORT_FRAGMENT}
`;

export const UPDATE_COMPARISON_REPORT_PRICE_PER_BUSHEL = gql`
  mutation UpdateComparisonReportPricePerBushel($input: CropComparisonDataMutationInput!) {
    cropComparisonData(input: $input) {
      ...CropComparisonReportFragment
    }
  }

  ${CROP_COMPARISON_REPORT_FRAGMENT}
`;

export const UPDATE_COMPARISON_REPORT_PREMIUM_PER_BUSHEL = gql`
  mutation UpdateComparisonReportPremiumPerBushel($input: CropComparisonDataMutationInput!) {
    cropComparisonData(input: $input) {
      ...CropComparisonReportFragment
    }
  }

  ${CROP_COMPARISON_REPORT_FRAGMENT}
`;

export const UPDATE_COMPARISON_REPORT_EXPENSES = gql`
  mutation UpdateComparisonReportExpenses($input: CropComparisonExpensesMutationInput!) {
    cropComparisonExpenses(input: $input) {
      ...CropComparisonReportFragment
    }
  }

  ${CROP_COMPARISON_REPORT_FRAGMENT}
`;

export const UPDATE_CROP_COMPARISON_FARM_INFO = gql`
  mutation UpdateCropComparisonFarmInfo(
    $id: ObjectID!
    $acres: Float!
    $farmName: String!
    $cropToCompare: ComparisonCropTypeEnum!
    $pricePerBushel: Float
    $yieldPerAcre: Float
  ) {
    cropComparisonAcres(input: { id: $id, acres: $acres }) {
      id
      acres
    }
    cropComparisonFarmName(input: { id: $id, farmName: $farmName }) {
      id
      farmName
    }
    cropComparisonCrop(input: { id: $id, cropToCompare: $cropToCompare }) {
      id
      comparedTo {
        id
        cropType
        crop {
          id
          label
        }
      }
    }
    cropComparisonData(input: {
      id: $id
      applyTo: COMPARED_CROP
      pricePerBushel: $pricePerBushel,
      yieldPerAcre: $yieldPerAcre,
    }) {
      id
      updatedAt
      comparedTo {
        id
        pricePerBushel
        yieldPerAcre
      }
    }
  }
`;

export const UPDATE_CROP_COMPARISON_YIELD_AND_PRICE = gql`
  mutation UpdateCropComparisonYieldAndPrice(
    $id: ObjectID!
    $pricePerBushel: Float
    $premiumPerBushel: Float
    $yieldPerAcre: Float
  ) {
    cropComparisonData(input: {
      id: $id
      applyTo: OLEIC
      pricePerBushel: $pricePerBushel,
      premiumPerBushel: $premiumPerBushel,
      yieldPerAcre: $yieldPerAcre,
    }) {
      ...CropComparisonYieldAndPriceFragment
    }
  }

  ${CROP_COMPARISON_YIELD_AND_PRICE_FRAGMENT}
`;

export const UPDATE_CROP_COMPARISON_EXPENSES = gql`
  mutation UpdateCropComparisonExpenses($input: CropComparisonExpensesMutationInput!) {
    cropComparisonExpenses(input: $input) {
      ...CropComparisonReportFragment
    }
  }

  ${CROP_COMPARISON_REPORT_FRAGMENT}
`;

export const CLONE_COMPARISON_REPORT = gql`
  mutation CloneComparisonReport($input: CloneCropComparisonMutationInput!) {
    cloneCropComparison(input: $input) {
      id
    }
  }
`;

export const DELETE_COMPARISON_REPORT = gql`
  mutation DeleteComparisonReport($input: DeleteCropComparisonMutationInput!) {
    deleteCropComparison(input: $input)
  }
`;

export const SEND_REPORT_EMAIL = gql`
  mutation SendReportEmail($input: SendComparisonReportEmailMutationInput!) {
    sendComparisonReportEmail(input: $input)
  }
`;
