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
        <form
          id="modify-crop-comparison"
          ref="form"
          class="max-w-md"
          @submit.prevent="$router.push(`/crop-comparison/${comparisonId}/yield-price`)"
        >
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
          ref="submitButton"
          form="modify-crop-comparison"
          color="logo-green"
          type="submit"
          :loading="isSaving"
          :disabled="isLoading"
        >
          Save &amp; Continue
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

import Acres from '../../../components/crop-comparison/fields/acres.vue';
import CropToCompare from '../../../components/crop-comparison/fields/crop-to-compare.vue';
import FarmName from '../../../components/crop-comparison/fields/farm-name.vue';
import MarketPrice from '../../../components/crop-comparison/fields/market-price.vue';
import Yield from '../../../components/crop-comparison/fields/yield.vue';

import cropOptions from '../../../components/crop-comparison/crop-options';
import { CROP_COMPARISON_FARM_INFO } from '../../../graphql/queries';
import { UPDATE_CROP_COMPARISON_FARM_INFO } from '../../../graphql/mutations';
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

  async beforeRouteLeave(to, from, next) {
    const { form, submitButton } = this.$refs;
    if (form.checkValidity()) {
      // form is valid. save the form and continue
      await this.save();
      next();
    } else {
      // simulate the form submit (via click) to trigger the native validation UI.
      submitButton.$el.click();
    }
  },

  apollo: {
    cropComparison: {
      query: CROP_COMPARISON_FARM_INFO,
      fetchPolicy: 'cache-and-network',
      variables() {
        return { id: this.comparisonId };
      },
      update({ cropComparison }) {
        return {
          ...cropComparison,
          comparedTo: {
            ...cropComparison.comparedTo,
            crop: { ...cropComparison.comparedTo.crop },
          },
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
        const { comparisonId, cropComparison, comparedTo } = this;
        const variables = {
          id: comparisonId,
          acres: parseFloat(cropComparison.acres),
          farmName: cropComparison.farmName,
          cropToCompare: comparedTo.crop.id,
          pricePerBushel: parseFloat(comparedTo.pricePerBushel),
          yieldPerAcre: parseFloat(comparedTo.yieldPerAcre),
        };
        await this.$apollo.mutate({ mutation: UPDATE_CROP_COMPARISON_FARM_INFO, variables });
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
