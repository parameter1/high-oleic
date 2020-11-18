<template>
  <header class="space-y-1 py-6 px-4 bg-logo-blue sm:px-6">
    <div class="flex items-center justify-between space-x-3">
      <div
        v-if="showTitle"
        class="text-lg leading-7 font-bold text-white"
      >
        <slot name="title">
          <h2>
            {{ title }}
          </h2>
        </slot>
      </div>
      <div class="h-7 flex items-center">
        <close-button
          v-bind="closeButton"
          @click="$emit('close', $event)"
        />
      </div>
    </div>
    <div
      v-if="showDescription"
      class="leading-5 text-logo-yellow"
    >
      <slot name="description">
        <p>
          {{ description }}
        </p>
      </slot>
    </div>
  </header>
</template>

<script>
import CloseButton from './close-button.vue';

export default {
  components: { CloseButton },

  props: {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    closeButton: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    showTitle() {
      return Boolean(this.title || this.hasTitleSlot);
    },
    showDescription() {
      return Boolean(this.description || this.hasDescriptionSlot);
    },
    hasTitleSlot() {
      return Boolean(this.$slots.title);
    },
    hasDescriptionSlot() {
      return Boolean(this.$slots.description);
    },
  },
};
</script>
