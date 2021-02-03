<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto sm:px-4">
      <div class="p-4">
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
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="flex">
                <back-link />

                <div class="p-4 w-full">
                  <div class="flex justify-between">
                    <div>
                      <h1 class="text-2xl mb-4 font-semibold">
                        High Oleic Scenario Report
                      </h1>
                      <edit-farm-name
                        tag="h2"
                        class="text-logo-blue text-lg leading-6 font-semibold max-w-sm"
                        :comparison-id="cropComparison.id"
                        :value="cropComparison.farmName"
                        :disabled="isUpdatingReport"
                        @saving="isUpdatingReport = $event"
                      />
                      <p class="mt-1 text-primary-1 text-base leading-6">
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

                      <div class="mt-1 text-sm leading-5 text-secondary-4">
                        Scenario last modified
                        <toggle-date-format :timestamp="cropComparison.updatedAt" />
                      </div>
                    </div>

                    <btn
                      class="mt-auto"
                      color="logo-blue"
                      @click="print"
                    >
                      Print Report
                    </btn>
                  </div>
                </div>
              </div>
            </div>

            <dl class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div class="flex flex-col bg-white shadow rounded-lg p-4">
                <div class="my-auto">
                  <dt class="text-sm font-medium text-logo-brown">
                    Total Acres
                  </dt>
                  <edit-acres
                    tag="dd"
                    class="mt-1 text-2xl font-semibold"
                    :comparison-id="cropComparison.id"
                    :value="cropComparison.acres"
                    :disabled="isUpdatingReport"
                    @saving="isUpdatingReport = $event"
                  />
                </div>
              </div>

              <div class="flex flex-col bg-white shadow rounded-lg p-4">
                <div class="my-auto">
                  <dt class="text-sm font-medium text-logo-brown">
                    High Oleic Advantage/Difference
                  </dt>

                  <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                    <div class="flex flex-col items-baseline text-2xl font-semibold">
                      <format-number
                        format="usd"
                        :value="cropComparison.advantage"
                        with-conditional
                      />
                      <span class="text-sm font-medium text-secondary-4">
                        profit per acre
                      </span>
                    </div>
                  </dd>
                </div>
              </div>

              <div class="flex flex-col bg-white shadow rounded-lg p-4">
                <div class="my-auto">
                  <dt class="text-sm font-medium text-logo-brown">
                    HO:CROP Ratio
                  </dt>

                  <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                    <div class="flex flex-col items-baseline text-2xl font-semibold">
                      {{ cropComparison.ratio }}
                      <span class="text-sm font-medium text-secondary-4">
                        This ratio can help with decision-making in next year’s
                        production planning when comparing crop prices and yields.
                      </span>
                    </div>
                  </dd>
                </div>
              </div>
            </dl>

            <div class="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <!-- Compared To -->
              <div class="bg-white shadow rounded-lg mb-6">
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
                  :crop-name="comparedTo.crop.label"
                  :comparison-id="cropComparison.id"
                  :yield-per-acre="comparedTo.yieldPerAcre"
                  :price-per-bushel="comparedTo.pricePerBushel"
                  :premium-per-bushel="comparedTo.premiumPerBushel"
                  :total-bushels="comparedTo.totalBushels"
                  :editors-disabled="isUpdatingReport"
                  @saving="isUpdatingReport = $event"
                />

                <div
                  v-for="expense in comparedTo.expenses.categories"
                  :key="expense.category.id"
                >
                  <table-header type="secondary">
                    {{ expense.category.label }}
                  </table-header>
                  <expense-category
                    apply-to="COMPARED_CROP"
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
              <div class="bg-white shadow rounded-lg mb-6">
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
                  :crop-name="oleic.crop.label"
                  :comparison-id="cropComparison.id"
                  :yield-per-acre="oleic.yieldPerAcre"
                  :price-per-bushel="oleic.pricePerBushel"
                  :premium-per-bushel="oleic.premiumPerBushel"
                  :total-bushels="oleic.totalBushels"
                  :editors-disabled="isUpdatingReport"
                  @saving="isUpdatingReport = $event"
                />

                <div
                  v-for="expense in oleic.expenses.categories"
                  :key="expense.category.id"
                >
                  <table-header type="secondary">
                    {{ expense.category.label }}
                  </table-header>
                  <expense-category
                    apply-to="OLEIC"
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
            </div>
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '../../../components/common/alert.vue';
import BackLink from '../../../components/crop-comparison/back-to-list-link.vue';
import Btn from '../../../components/common/button.vue';
import CropTableHeader from '../../../components/crop-comparison/report-tables/crop-table-header.vue';
import EconomicResults from '../../../components/crop-comparison/report-tables/economic-results.vue';
import ExpenseCategory from '../../../components/crop-comparison/report-tables/expense-category.vue';
import ExpenseTotals from '../../../components/crop-comparison/report-tables/expense-totals.vue';
import FormatNumber from '../../../components/format-number.vue';
import TableHeader from '../../../components/crop-comparison/report-tables/common/header.vue';
import ToggleDateFormat from '../../../components/toggle-date-format.vue';
import YieldPrice from '../../../components/crop-comparison/report-tables/yield-price.vue';

import EditAcres from '../../../components/crop-comparison/inline-editor/acres.vue';
import EditFarmName from '../../../components/crop-comparison/inline-editor/farm-name.vue';

import { CROP_COMPARISON_REPORT } from '../../../graphql/queries';
import GraphQLError from '../../../utils/graphql-error';

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
    Alert,
    BackLink,
    Btn,
    CropTableHeader,
    EconomicResults,
    ExpenseCategory,
    ExpenseTotals,
    FormatNumber,
    EditAcres,
    EditFarmName,
    TableHeader,
    ToggleDateFormat,
    YieldPrice,
  },

  apollo: {
    cropComparison: {
      query: CROP_COMPARISON_REPORT,
      variables() {
        return { id: this.$route.params.id };
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
    isUpdatingReport: false,
  }),

  computed: {
    oleic() {
      return this.cropComparison.oleic;
    },
    comparedTo() {
      return this.cropComparison.comparedTo;
    },
  },

  methods: {
    print() {
      window.print();
    },
  },
};
</script>
