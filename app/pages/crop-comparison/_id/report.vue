<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
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
            <div class="bg-white overflow-hidden shadow rounded-lg p-4 mb-6">
              <h1 class="text-2xl mb-4 font-semibold">
                High Oleic Scenerio Report
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
                  {{ formatInteger(cropComparison.acres) }}
                </span>
                acres of
                <span class="text-logo-green font-semibold">
                  {{ cropComparison.comparedTo.crop.label }}
                </span>
                to
                <span class="text-logo-green font-semibold">
                  {{ cropComparison.oleic.crop.label }}
                </span>
              </p>

              <div class="mt-1 text-sm leading-5 text-secondary-4">
                Scenerio last modified <toggle-date-format :timestamp="cropComparison.updatedAt" />
              </div>
            </div>

            <div>
              <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div class="bg-white overflow-hidden shadow rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Total Acres
                    </dt>
                    <edit-acres
                      tag="dd"
                      class="mt-1 text-2xl font-semibold text-gray-900"
                      :comparison-id="cropComparison.id"
                      :value="cropComparison.acres"
                      :disabled="isUpdatingReport"
                      @saving="isUpdatingReport = $event"
                    />
                  </div>
                </div>

                <div class="bg-white overflow-hidden shadow rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      High Oleic Advantage
                    </dt>

                    <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
                      <div class="flex items-baseline text-2xl font-semibold text-gray-900">
                        {{ formatUSD(cropComparison.advantage) }}
                        <span class="ml-2 text-sm font-medium text-gray-500">
                          profit per acre
                        </span>
                      </div>
                    </dd>
                  </div>
                </div>

                <div class="bg-white overflow-hidden shadow rounded-lg">
                  <div class="px-4 py-5 sm:p-6">
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      HO Ratio
                    </dt>
                    <dd class="mt-1 text-2xl font-semibold text-gray-900">
                      {{ cropComparison.ratio }}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '../../../components/common/alert.vue';
import ToggleDateFormat from '../../../components/toggle-date-format.vue';

import EditAcres from '../../../components/crop-comparison/inline-editor/acres.vue';
import EditFarmName from '../../../components/crop-comparison/inline-editor/farm-name.vue';

import { CROP_COMPARISON_REPORT } from '../../../graphql/queries';
import GraphQLError from '../../../utils/graphql-error';
import formatNumber from '../../../utils/format-number';

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
    EditAcres,
    EditFarmName,
    ToggleDateFormat,
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

  methods: {
    formatInteger(value) {
      return formatNumber.integer(value);
    },
    formatUSD(value) {
      return formatNumber.usd(value);
    },
  },
};
</script>
