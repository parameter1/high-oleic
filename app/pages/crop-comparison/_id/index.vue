<template>
  <div class="p-4">
    <alert
      v-if="error"
      type="danger"
      class="mb-5 shadow-sm"
    >
      {{ error.message }}
    </alert>
    <section v-else class="max-w-md">
      <form id="modify-crop-comparison" @submit.prevent="save">
        <fieldset :disabled="isLoading || isSaving">
          <farm-name
            id="modify-crop-comparison.farm-name"
            ref="farmName"
            v-model="cropComparison.farmName"
            class="mb-5"
            required
          />

          <acres
            id="modify-crop-comparison.acres"
            v-model="cropComparison.acres"
            class="mb-5"
            required
          />

          <crop-to-compare
            id="modify-crop-comparison.crop-to-compare"
            v-model="comparedTo.crop.id"
            class="mb-5"
            required
          />

          <market-price
            id="modify-crop-comparison.price-per-bushel"
            v-model="comparedTo.pricePerBushel"
            :crop="cropLabel"
            class="mb-5"
            required
          />

          <yield
            id="modify-crop-comparison.yield-per-acre"
            v-model="comparedTo.yieldPerAcre"
            :crop="cropLabel"
            required
          />
        </fieldset>
      </form>

      <alert
        v-if="savingError"
        type="danger"
        header="Save Failed"
        class="mt-6"
      >
        {{ savingError.message }}
      </alert>

      <div class="flex justify-start space-x-4 mt-6">
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
          :disabled="isLoading || isSaving"
          @click="reset"
        >
          Reset
        </btn>
      </div>
    </section>
  </div>
</template>

<script>
import Alert from '../../../components/common/alert.vue';
import Btn from '../../../components/common/button.vue';

import Acres from '../../../components/crop-comparison/fields/acres.vue';
import CropToCompare from '../../../components/crop-comparison/fields/crop-to-compare.vue';
import FarmName from '../../../components/crop-comparison/fields/farm-name.vue';
import MarketPrice from '../../../components/crop-comparison/fields/market-price.vue';
import Yield from '../../../components/crop-comparison/fields/yield.vue';

import cropOptions from '../../../components/crop-comparison/crop-options';
import { MODIFY_COMPARISON_FARM_INFO } from '../../../graphql/queries';
import GraphQLError from '../../../utils/graphql-error';

export default {
  components: {
    Acres,
    Alert,
    Btn,
    CropToCompare,
    FarmName,
    MarketPrice,
    Yield,
  },

  apollo: {
    cropComparison: {
      query: MODIFY_COMPARISON_FARM_INFO,
      fetchPolicy: 'cache-and-network',
      variables() {
        return { id: this.comparisonId };
      },
      update({ cropComparison }) {
        return {
          ...cropComparison,
          comparedTo: { ...cropComparison.comparedTo },
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

  async beforeRouteLeave(to, from, next) {
    if (/^crop-comparison-id-/.test(to.name)) {
      // auto-save when navigating between edit pages
      await this.save();
      next();
    } else {
      next();
    }
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
      comparedTo: { crop: {} },
    },
    isSaving: false,
    savingError: null,
  }),

  computed: {
    /**
     *
     */
    cropLabel() {
      const { id } = this.comparedTo.crop;
      if (!id) return null;
      const crop = cropOptions().find((option) => option.value === id);
      return crop.label;
    },
    comparedTo() {
      return this.cropComparison.comparedTo;
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
