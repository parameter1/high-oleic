<template>
  <div class="mb-4 flex items-center">
    <h1 class="text-2xl font-semibold">
      <slot />
    </h1>
    <loading-spinner
      v-if="isLoading"
      :with-label="false"
      size="medium"
      class="ml-2"
    />
  </div>
</template>

<script>
import LoadingSpinner from '../common/loading-spinner.vue';

export default {
  components: { LoadingSpinner },

  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
