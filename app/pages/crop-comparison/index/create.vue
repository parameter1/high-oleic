<template>
  <slide-over
    v-model="show"
    :description="description"
    with-overlay
    @after-leave="returnToList"
    @after-enter="focus"
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
          @click.stop="show = false"
        >
          Cancel
        </btn>
      </div>
    </template>
  </slide-over>
</template>

<script>
import Acres from '../../../components/crop-comparison/fields/acres.vue';
import Alert from '../../../components/common/alert.vue';
import Btn from '../../../components/common/button.vue';
import CropToCompare from '../../../components/crop-comparison/fields/crop-to-compare.vue';
import FarmName from '../../../components/crop-comparison/fields/farm-name.vue';
import MarketPrice from '../../../components/crop-comparison/fields/market-price.vue';
import SlideOver from '../../../components/overlays/slide-over.vue';
import Yield from '../../../components/crop-comparison/fields/yield.vue';

import cropOptions from '../../../components/crop-comparison/crop-options';
import GraphQLError from '../../../utils/graphql-error';
import { CREATE_CROP_COMPARISON } from '../../../graphql/mutations';

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
    listQuery: {
      type: Object,
      required: true,
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
    show: false,
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

  mounted() {
    this.show = true;
  },

  methods: {
    /**
     *
     */
    async create() {
      try {
        this.error = null;
        this.isSaving = true;
        const { input } = this;
        const variables = {
          input: {
            ...input,
            acres: parseInt(input.acres, 10),
            pricePerBushel: parseFloat(input.pricePerBushel),
            yieldPerAcre: parseFloat(input.yieldPerAcre),
          },
        };
        await this.$apollo.mutate({
          mutation: CREATE_CROP_COMPARISON,
          variables,
        });
        await this.listQuery.refetch();
        this.show = false;
      } catch (e) {
        this.error = new GraphQLError(e);
      } finally {
        this.isSaving = false;
      }
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

    /**
     */
    returnToList() {
      this.$router.replace('/crop-comparison');
    },
  },
};
</script>
