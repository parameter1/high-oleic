<template>
  <div class="pt-2 pb-6 md:py-6 print:py-0 print:pt-0">
    <div class="max-w-7xl mx-auto sm:px-4 print:px-0">
      <div class="p-4 print:p-0">
        <client-only placeholder="Loading...">
          <div v-if="isLoading">
            Loading...
          </div>
          <alert
            v-else-if="error"
            type="danger"
            class="mb-5 shadow-sm"
          >
            {{ error.message }}
          </alert>

          <div v-else>
            <!-- Share overlay -->
            <share-overlay
              v-if="canShare"
              v-model="isShareOpen"
              :comparison-id="comparisonId"
              :public-link="cropComparison.publicLink"
            />

            <!-- Main report header -->
            <div :class="classes.header">
              <div class="flex">
                <back-link v-if="!isPublic" class="print:hidden" />

                <div class="p-4 w-full print:p-2">
                  <div class="flex flex-col md:flex-row justify-between">
                    <div>
                      <h1 class="text-2xl print:text-base mb-4 print:mb-0 font-semibold">
                        High Oleic Scenario Report
                        <span v-if="isPublic">(Shared)</span>
                      </h1>
                      <edit-farm-name
                        tag="h2"
                        class="text-logo-blue text-lg print:text-sm font-semibold max-w-sm"
                        :can-edit="canEdit"
                        :comparison-id="cropComparison.id"
                        :value="cropComparison.farmName"
                        :disabled="isUpdatingReport"
                        @saving="isUpdatingReport = $event"
                      />
                      <p class="mt-1 text-primary-1 text-base print:text-xs leading-6">
                        Comparing
                        <span class="text-logo-green font-semibold">
                          <format-number format="integer" :value="cropComparison.acres" />
                        </span>
                        acres of
                        <span class="text-logo-green font-semibold">
                          {{ comparedTo.crop.label }}
                        </span>
                        to
                        <span class="text-logo-green font-semibold">
                          {{ oleic.crop.label }}
                        </span>
                      </p>

                      <div
                        v-if="isPublic"
                        class="mt-1 text-sm print:text-xs leading-5 text-secondary-4"
                      >
                        Shared by {{ cropComparison.createdBy.email }}
                      </div>

                      <div class="mt-1 text-sm print:hidden leading-5 text-secondary-4">
                        Scenario last modified
                        <toggle-date-format :timestamp="cropComparison.updatedAt" />
                      </div>
                    </div>

                    <div class="mt-4 md:mt-auto space-x-2 print:hidden flex">
                      <btn
                        color="logo-blue"
                        @click="print"
                      >
                        Print Report
                      </btn>
                      <btn
                        v-if="canShare"
                        color="logo-green"
                        @click="share"
                      >
                        Share Report
                      </btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Overview cards -->
            <dl :class="classes.overviewCards">
              <overview-card title="Total Acres">
                <template #body>
                  <edit-acres
                    tag="dd"
                    class="mt-1 print:mt-0 text-2xl print:text-sm font-semibold"
                    :can-edit="canEdit"
                    :comparison-id="cropComparison.id"
                    :value="cropComparison.acres"
                    :disabled="isUpdatingReport"
                    @saving="isUpdatingReport = $event"
                  />
                </template>
              </overview-card>

              <overview-card
                title="High Oleic Advantage/Difference"
                description="profit per acre"
              >
                <format-number
                  format="usd"
                  :value="cropComparison.advantage"
                  with-conditional
                />
              </overview-card>

              <overview-card
                title="HO:CROP Price Ratio"
                :description="hoDescription"
                hide-print-description
              >
                {{ cropComparison.ratio }}
              </overview-card>
            </dl>

            <!-- Data Grid (Economic Results + Yield/Price) -->
            <grid-container class="mt-5 print:mt-0">
              <!-- Compared To (Results + Yield) -->
              <div class="bg-white shadow rounded-t-lg print:shadow-none">
                <crop-table-header
                  :crop="comparedTo.crop"
                  :profit="comparedTo.profit"
                />

                <table-header type="secondary">
                  Economic Results
                </table-header>
                <economic-results
                  :income="comparedTo.income"
                  :expenses="comparedTo.expenses"
                  :profit="comparedTo.profit"
                />

                <table-header type="secondary">
                  Yield &amp; Price
                </table-header>
                <yield-price
                  apply-to="COMPARED_CROP"
                  :can-edit="canEdit"
                  :crop-name="comparedTo.crop.label"
                  :comparison-id="cropComparison.id"
                  :yield-per-acre="comparedTo.yieldPerAcre"
                  :price-per-bushel="comparedTo.pricePerBushel"
                  :premium-per-bushel="comparedTo.premiumPerBushel"
                  :total-bushels="comparedTo.totalBushels"
                  :editors-disabled="isUpdatingReport"
                  @saving="isUpdatingReport = $event"
                />
              </div>

              <!-- Oleic (Results + Yield) -->
              <div class="bg-white shadow rounded-t-lg print:shadow-none">
                <crop-table-header
                  :crop="oleic.crop"
                  :profit="oleic.profit"
                />

                <table-header type="secondary">
                  Economic Results
                </table-header>
                <economic-results
                  :income="oleic.income"
                  :expenses="oleic.expenses"
                  :profit="oleic.profit"
                />

                <table-header type="secondary">
                  Yield &amp; Price
                </table-header>
                <yield-price
                  apply-to="OLEIC"
                  :can-edit="canEdit"
                  :crop-name="oleic.crop.label"
                  :comparison-id="cropComparison.id"
                  :yield-per-acre="oleic.yieldPerAcre"
                  :price-per-bushel="oleic.pricePerBushel"
                  :premium-per-bushel="oleic.premiumPerBushel"
                  :total-bushels="oleic.totalBushels"
                  :editors-disabled="isUpdatingReport"
                  @saving="isUpdatingReport = $event"
                />
              </div>
            </grid-container>

            <!-- Data Grid (Expense categories + line items) -->
            <grid-container>
              <!-- Compared To -->
              <div class="bg-white shadow rounded-b-lg mb-6 print:mb-0 print:shadow-none">
                <div
                  v-for="expense in comparedTo.expenses.categories"
                  :key="expense.category.id"
                >
                  <table-header type="secondary">
                    {{ expense.category.label }}
                  </table-header>
                  <expense-category
                    apply-to="COMPARED_CROP"
                    :can-edit="canEdit"
                    :expense="expense"
                    :crop-name="comparedTo.crop.label"
                    :comparison-id="cropComparison.id"
                    :yield-per-acre="comparedTo.yieldPerAcre"
                    :price-per-bushel="comparedTo.pricePerBushel"
                    :premium-per-bushel="comparedTo.premiumPerBushel"
                    :total-bushels="comparedTo.totalBushels"
                    :editors-disabled="isUpdatingReport"
                    @saving="isUpdatingReport = $event"
                  />
                </div>
                <table-header type="secondary" class="uppercase">
                  Total Expenses
                </table-header>
                <expense-totals :expenses="comparedTo.expenses" />
              </div>

              <!-- Oleic -->
              <div class="bg-white shadow rounded-b-lg mb-6 print:mb-0 print:shadow-none">
                <div
                  v-for="expense in oleic.expenses.categories"
                  :key="expense.category.id"
                >
                  <table-header type="secondary">
                    {{ expense.category.label }}
                  </table-header>
                  <expense-category
                    apply-to="OLEIC"
                    :can-edit="canEdit"
                    :expense="expense"
                    :crop-name="oleic.crop.label"
                    :comparison-id="cropComparison.id"
                    :yield-per-acre="oleic.yieldPerAcre"
                    :price-per-bushel="oleic.pricePerBushel"
                    :premium-per-bushel="oleic.premiumPerBushel"
                    :total-bushels="oleic.totalBushels"
                    :editors-disabled="isUpdatingReport"
                    @saving="isUpdatingReport = $event"
                  />
                </div>
                <table-header type="secondary" class="uppercase">
                  Total Expenses
                </table-header>
                <expense-totals :expenses="oleic.expenses" />
              </div>
            </grid-container>

            <!-- Ag View Solutions attribution -->
            <ag-view-solutions class="print:mt-3" />
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import AgViewSolutions from '../ag-view-solutions.vue';
import Alert from '../common/alert.vue';
import BackLink from './back-to-list-link.vue';
import Btn from '../common/button.vue';
import CropTableHeader from './report-tables/crop-table-header.vue';
import EconomicResults from './report-tables/economic-results.vue';
import EditAcres from './inline-editor/acres.vue';
import EditFarmName from './inline-editor/farm-name.vue';
import ExpenseCategory from './report-tables/expense-category.vue';
import ExpenseTotals from './report-tables/expense-totals.vue';
import FormatNumber from '../format-number.vue';
import GridContainer from './report-tables/grid-container.vue';
import OverviewCard from './overview-card.vue';
import ShareOverlay from './share.vue';
import TableHeader from './report-tables/common/header.vue';
import ToggleDateFormat from '../toggle-date-format.vue';
import YieldPrice from './report-tables/yield-price.vue';

import { CROP_COMPARISON_REPORT, PUBLIC_CROP_COMPARISON_REPORT } from '../../graphql/queries';
import GraphQLError from '../../utils/graphql-error';

const defaultCropField = {
  crop: {},
  expenses: {
    categories: [],
  },
  income: {},
  profit: {},
};

export default {
  components: {
    AgViewSolutions,
    Alert,
    BackLink,
    Btn,
    CropTableHeader,
    EconomicResults,
    EditAcres,
    EditFarmName,
    ExpenseCategory,
    ExpenseTotals,
    FormatNumber,
    GridContainer,
    OverviewCard,
    ShareOverlay,
    TableHeader,
    ToggleDateFormat,
    YieldPrice,
  },

  props: {
    comparisonId: {
      type: String,
      default: null,
    },
    publicId: {
      type: String,
      default: null,
    },
  },

  apollo: {
    cropComparison: {
      query() {
        if (this.isPublic) return PUBLIC_CROP_COMPARISON_REPORT;
        return CROP_COMPARISON_REPORT;
      },
      variables() {
        const id = this.isPublic ? this.publicId : this.comparisonId;
        return { id };
      },
      update(data) {
        if (this.isPublic) return data.publicCropComparison;
        return data.cropComparison;
      },
      fetchPolicy: 'cache-and-network',
      error(e) { this.error = new GraphQLError(e); },
      watchLoading(isLoading) {
        this.isLoading = isLoading;
        if (isLoading) this.error = null;
      },
      prefetch: false,
    },
  },

  data: () => ({
    error: null,
    isLoading: true,
    cropComparison: {
      oleic: { ...defaultCropField },
      comparedTo: { ...defaultCropField },
    },
    classes: {
      header: [
        'bg-white',
        'overflow-hidden',
        'print:overflow-visible',
        'shadow',
        'print:shadow-none',
        'print:border-b',
        'print:rounded-none',
        'rounded-lg',
      ],
      overviewCards: [
        'print:border-b',
        'mt-5',
        'print:mt-0',
        'grid',
        'grid-cols-1',
        'gap-4',
        'print:gap-2',
        'sm:grid-cols-3',
        'print:grid-cols-3',
      ],
    },
    hoDescription: 'This ratio can help with decision-making in next year’s production planning when comparing crop prices and yields.',
    isUpdatingReport: false,
    isShareOpen: false,
  }),

  computed: {
    canEdit() {
      return !this.isPublic;
    },

    canShare() {
      return !this.isPublic;
    },

    oleic() {
      return this.cropComparison.oleic;
    },

    comparedTo() {
      return this.cropComparison.comparedTo;
    },

    isPublic() {
      return Boolean(this.publicId);
    },
  },

  methods: {
    print() {
      window.print();
    },

    share() {
      if (this.canShare) this.isShareOpen = true;
    },
  },
};
</script>
