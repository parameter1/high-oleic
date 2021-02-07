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
    publicId
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

export const CROP_COMPARISON_FARM_INFO_FRAGMENT = gql`
  fragment CropComparisonFarmInfoFragment on CropComparison {
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
`;

export const CROP_COMPARISON_YIELD_AND_PRICE_FRAGMENT = gql`
  fragment CropComparisonYieldAndPriceFragment on CropComparison {
    id
    updatedAt
    oleic {
      id
      yieldPerAcre
      pricePerBushel
      premiumPerBushel
    }
  }
`;

export const CROP_COMPARISON_LAND_TAXES_FRAGMENT = gql`
  fragment CropComparisonLandTaxesFragment on CropComparison {
    id
    updatedAt
    comparedTo {
      id
      expenses {
        categories {
          lineItems {
            lineItem {
              id
              label
              ... on ExpenseCategoryCropLineItem {
                cropType: type
              }
            }
            costs {
              total
              perAcre
            }
          }
        }
      }
    }

    oleic {
      id
      expenses {
        categories {
          lineItems {
            lineItem {
              id
              label
              ... on ExpenseCategoryCropLineItem {
                cropType: type
              }
            }
            costs {
              total
              perAcre
            }
          }
        }
      }
    }
  }
`;
