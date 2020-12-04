<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto sm:px-4">
      <div class="p-4">
        <client-only>
          <alert
            v-if="error"
            type="danger"
            class="mb-5 shadow-sm"
          >
            {{ error.message }}
          </alert>
          <main v-else>
            <div class="bg-white overflow-hidden shadow rounded-lg p-4 mb-5">
              <page-header :is-loading="isLoading || isChildLoading">
                Modify Profit Scenerio
              </page-header>
              <h2 class="text-logo-blue text-lg leading-6 font-semibold max-w-sm">
                {{ cropComparison.farmName }}
              </h2>
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
                Scenerio last modified <toggle-date-format :timestamp="cropComparison.updatedAt" />
              </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
              <modify-nav class="p-4" :comparison-id="comparisonId" />
              <nuxt-child
                :comparison-id="comparisonId"
                @loading="isChildLoading = $event"
              />
            </div>
          </main>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '../../components/common/alert.vue';
import FormatNumber from '../../components/format-number.vue';
import ModifyNav from '../../components/crop-comparison/modify-nav.vue';
import PageHeader from '../../components/crop-comparison/page-header.vue';
import ToggleDateFormat from '../../components/toggle-date-format.vue';

import { MODIFY_COMPARISON_ROOT } from '../../graphql/queries';
import GraphQLError from '../../utils/graphql-error';

export default {
  components: {
    Alert,
    FormatNumber,
    ModifyNav,
    PageHeader,
    ToggleDateFormat,
  },

  apollo: {
    cropComparison: {
      query: MODIFY_COMPARISON_ROOT,
      fetchPolicy: 'cache-and-network',
      variables() {
        return { id: this.comparisonId };
      },
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
    isChildLoading: false,
    isLoading: true,
    cropComparison: {
      oleic: { crop: {} },
      comparedTo: { crop: {} },
    },
  }),

  computed: {
    comparisonId() {
      return this.$route.params.id;
    },
    oleic() {
      return this.cropComparison.oleic;
    },
    comparedTo() {
      return this.cropComparison.comparedTo;
    },
  },
};
</script>