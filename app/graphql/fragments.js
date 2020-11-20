import gql from 'graphql-tag';

export const CROP_COMPARISON_FIELD_FRAGMENT = gql`
  fragment CropComparisonFieldFragment on CropComparisonField {
    id
    acres
    cropType
    crop {
      id
      label
    }
    yieldPerAcre
    totalBushels
    pricePerBushel
    premiumPerBushel
    revenuePerBushel
    expenses {
      total
      perAcre
      perBushel
      pctCost
      categories {
        category {
          id
          label
        }
        costs {
          total
          perAcre
          perBushel
        }
        lineItems {
          lineItem {
            id
            label
            ... on ExpenseCategoryCropLineItem {
              cropType: type
            }
            ... on ExpenseCategoryChemicalsLineItem {
              chemicalsType: type
            }
            ... on ExpenseCategoryFieldOpsLineItem {
              fieldOpsType: type
            }
            ... on ExpenseCategoryHandlingLineItem {
              handlingType: type
            }
            unit
          }
          costs {
            total
            perAcre
            perBushel
          }
        }
      }
    }
    income {
      total
      perAcre
      perBushel
    }
    profit {
      total
      perAcre
      perBushel
      margin
    }
  }
`;

export const CROP_COMPARISON_REPORT_FRAGMENT = gql`
  fragment CropComparisonReportFragment on CropComparison {
    id
    farmName
    acres
    advantage
    ratio
    comparedTo {
      ...CropComparisonFieldFragment
    }
    oleic {
      ...CropComparisonFieldFragment
    }
    updatedAt
  }

  ${CROP_COMPARISON_FIELD_FRAGMENT}
`;
