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
        <fieldset :disabled="isCreating">
          <input-group
            id="create-crop-comparison.farm-name"
            ref="farmName"
            v-model="input.farmName"
            class="mb-4"
            label="Farm name"
            required
            hint="What is the farm name where you’re looking to place high oleic soy?"
          />

          <input-group
            id="create-crop-comparison.acres"
            v-model="input.acres"
            class="mb-4"
            label="How many acres is it?"
            type="number"
            :min="1"
            required
          />

          <input-group
            id="create-crop-comparison.price-per-bushel"
            v-model="input.pricePerBushel"
            label="Market price"
            type="number"
            :min="0.01"
            :step="0.01"
            class="mb-4"
            input-class="pl-7 pr-20"
            required
            hint="What market price would you like to use for [crop], in dollars per bushel"
          >
            <template #prepend>
              <span class="text-gray-500 sm:text-sm sm:leading-5">
                $
              </span>
            </template>
            <template #append>
              <span class="text-gray-500 sm:text-sm sm:leading-5">
                per bushel
              </span>
            </template>
          </input-group>

          <input-group
            id="create-crop-comparison.yield-per-acre"
            v-model="input.yieldPerAcre"
            label="What is the yield of [crop]?"
            type="number"
            :min="1"
            input-class="pr-32"
            required
            hint="The yield of the crop in bushels per acre"
          >
            <template #append>
              <span class="text-gray-500 sm:text-sm sm:leading-5">
                bushels per acre
              </span>
            </template>
          </input-group>
        </fieldset>
      </form>
    </template>

    <template #footer>
      <btn
        form="create-crop-comparison"
        color="logo-green"
        type="submit"
        :loading="isCreating"
      >
        Save &amp; Continue
      </btn>
      <btn
        form="create-crop-comparison"
        color="secondary-3"
        :disabled="isCreating"
        @click.stop="$emit('input', false)"
      >
        Cancel
      </btn>
    </template>
  </slide-over>
</template>

<script>
import Btn from '../common/button.vue';
import InputGroup from '../common/forms/input-group.vue';
import SlideOver from '../overlays/slide-over.vue';

export default {
  components: {
    Btn,
    InputGroup,
    SlideOver,
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
    isCreating: false,
  }),

  methods: {
    /**
     *
     */
    create() {
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
      this.isCreating = false;
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
