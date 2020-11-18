<template>
  <slide-over
    :value="value"
    :description="description"
    with-overlay
    @input="$emit('input', $event)"
    @after-enter="focus"
    @after-leave="reset"
  >
    <template #title>
      <div class="flex items-center">
        Create New Scenerio
      </div>
    </template>

    <template #body>
      <form
        id="create-crop-comparison"
        class="py-8 px-4"
        @submit.prevent="create"
      >
        <fieldset :disabled="isSaving">
          <farm-name
            id="create-crop-comparison.farm-name"
            ref="farmName"
            v-model="input.farmName"
            class="mb-5"
            required
          />

          <acres
            id="create-crop-comparison.acres"
            v-model="input.acres"
            class="mb-5"
            required
          />

          <crop-to-compare
            id="create-crop-comparison.crop-to-compare"
            v-model="input.cropToCompare"
            class="mb-5"
            required
            :disabled="isSaving"
          />

          <market-price
            id="create-crop-comparison.price-per-bushel"
            v-model="input.pricePerBushel"
            :crop="cropLabel"
            class="mb-5"
            required
          />

          <yield
            id="create-crop-comparison.yield-per-acre"
            v-model="input.yieldPerAcre"
            :crop="cropLabel"
            required
          />
        </fieldset>
      </form>
    </template>

    <template #footer>
      <alert
        v-if="error"
        type="danger"
        header="Save Failed"
        class="mb-6"
      >
        {{ error.message }}
      </alert>

      <div class="flex justify-start space-x-4">
        <btn
          form="create-crop-comparison"
          color="logo-green"
          type="submit"
          :loading="isSaving"
        >
          Save &amp; Continue
        </btn>
        <btn
          form="create-crop-comparison"
          color="secondary-3"
          :disabled="isSaving"
          @click.stop="$emit('input', false)"
        >
          Cancel
        </btn>
      </div>
    </template>
  </slide-over>
</template>

<script>
import Acres from './fields/acres.vue';
import Alert from '../common/alert.vue';
import Btn from '../common/button.vue';
import CropToCompare from './fields/crop-to-compare.vue';
import FarmName from './fields/farm-name.vue';
import MarketPrice from './fields/market-price.vue';
import SlideOver from '../overlays/slide-over.vue';
import Yield from './fields/yield.vue';

import cropOptions from './crop-options';

export default {
  components: {
    Acres,
    Alert,
    Btn,
    CropToCompare,
    FarmName,
    MarketPrice,
    SlideOver,
    Yield,
  },

  props: {
    value: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    description: 'Get started on a new crop comparison scenerio by filling in the information below.',
    error: null,
    input: {
      farmName: null,
      acres: null,
      cropToCompare: null,
      pricePerBushel: null,
      yieldPerAcre: null,
    },
    isSaving: false,
  }),

  computed: {
    /**
     *
     */
    cropLabel() {
      const { cropToCompare } = this.input;
      if (!cropToCompare) return null;
      const crop = cropOptions().find((option) => option.value === cropToCompare);
      return crop.label;
    },
  },

  methods: {
    /**
     *
     */
    create() {
      this.isSaving = true;
      console.log(this.input);
    },

    /**
     *
     */
    focus() {
      const input = this.$refs.farmName.$el.querySelector('input');
      if (input) input.focus();
    },

    /**
     *
     */
    reset() {
      this.isSaving = false;
      this.error = null;
      this.input = {
        farmName: null,
        acres: null,
        cropToCompare: null,
        pricePerBushel: null,
        yieldPerAcre: null,
      };
    },
  },
};
</script>
