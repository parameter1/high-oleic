<template>
  <div class="p-4">
    <alert
      v-if="error"
      type="danger"
      class="mb-5 shadow-sm"
    >
      {{ error.message }}
    </alert>
    <section v-else>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <form id="modify-crop-comparison" class="max-w-md" @submit.prevent="save">
          <fieldset :disabled="isLoading || isSaving">
            <ho-yield
              id="modify-crop-comparison.ho-yield-per-acre"
              v-model="oleic.yieldPerAcre"
              class="mb-5"
            />
            <ho-market-price
              id="modify-crop-comparison.ho-market-price"
              v-model="oleic.pricePerBushel"
              class="mb-5"
            />
            <ho-premium
              id="modify-crop-comparison.ho-premium"
              v-model="oleic.premiumPerBushel"
            />
          </fieldset>
        </form>
      </div>

      <alert
        v-if="savingError"
        type="danger"
        header="Save Failed"
        class="mt-6"
      >
        {{ savingError.message }}
      </alert>

      <div class="flex justify-start mt-6 pt-4 border-t border-secondary-5-200">
        <btn
          form="modify-crop-comparison"
          color="logo-green"
          type="submit"
          :loading="isSaving"
          :disabled="isLoading"
        >
          Save &amp; Continue
        </btn>
        <btn
          form="modify-crop-comparison"
          color="secondary-3"
          class="ml-4"
          :disabled="isLoading || isSaving"
          @click="reset"
        >
          Reset
        </btn>

        <btn
          class="ml-auto"
          :disabled="isLoading || isSaving"
          @click.prevent="$router.push(`/crop-comparison/report/${comparisonId}`)"
        >
          View Report
        </btn>
      </div>
    </section>
  </div>
</template>

<script>
import Alert from '../../../components/common/alert.vue';
import Btn from '../../../components/common/button.vue';

import HoMarketPrice from '../../../components/crop-comparison/fields/ho-market-price.vue';
import HoPremium from '../../../components/crop-comparison/fields/ho-premium.vue';
import HoYield from '../../../components/crop-comparison/fields/ho-yield.vue';

import { CROP_COMPARISON_YIELD_AND_PRICE } from '../../../graphql/queries';
import { UPDATE_CROP_COMPARISON_YIELD_AND_PRICE } from '../../../graphql/mutations';
import GraphQLError from '../../../utils/graphql-error';

export default {
  components: {
    Alert,
    Btn,
    HoMarketPrice,
    HoPremium,
    HoYield,
  },

  apollo: {
    cropComparison: {
      query: CROP_COMPARISON_YIELD_AND_PRICE,
      fetchPolicy: 'cache-and-network',
      variables() {
        return { id: this.comparisonId };
      },
      update({ cropComparison }) {
        return {
          ...cropComparison,
          oleic: { ...cropComparison.oleic },
        };
      },
      error(e) { this.error = new GraphQLError(e); },
      watchLoading(isLoading) {
        this.isLoading = isLoading;
        this.$emit('loading', isLoading);
        if (isLoading) this.error = null;
      },
      prefetch: false,
    },
  },

  props: {
    comparisonId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    error: null,
    isLoading: true,
    cropComparison: {
      oleic: {},
    },
    isSaving: false,
    savingError: null,
  }),

  computed: {
    oleic() {
      return this.cropComparison.oleic;
    },
  },

  methods: {
    /**
     *
     */
    async save() {
      try {
        this.savingError = null;
        this.isSaving = true;
        const { comparisonId, oleic } = this;
        const variables = {
          id: comparisonId,
          yieldPerAcre: parseFloat(oleic.yieldPerAcre),
          pricePerBushel: parseFloat(oleic.pricePerBushel),
          premiumPerBushel: parseFloat(oleic.premiumPerBushel),
        };
        await this.$apollo.mutate({ mutation: UPDATE_CROP_COMPARISON_YIELD_AND_PRICE, variables });
        this.$router.push(`/crop-comparison/${comparisonId}/land-taxes-rtm`);
      } catch (e) {
        this.savingError = new GraphQLError(e);
      } finally {
        this.isSaving = false;
      }
    },

    reset() {
      this.$apollo.queries.cropComparison.refresh();
    },
  },
};
</script>
