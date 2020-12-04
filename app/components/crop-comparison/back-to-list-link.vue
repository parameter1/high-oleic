<template>
  <nuxt-link
    to="/crop-comparison"
    :class="classes"
    title="Go back to all scenarios"
  >
    <span class="sr-only">
      Go back to all scenarios
    </span>
    <chevron-icon class="w-5 h-5" />
  </nuxt-link>
</template>

<script>
import ChevronIcon from '../icons/chevron-right-md.vue';

export default {
  components: { ChevronIcon },

  data: () => ({
    classes: [
      'flex',
      'flex-col',
      'justify-center',
      'p-4',
      'border-r',
      'border-secondary-5-200',
      'hover:bg-secondary-5-200',
    ],
  }),
};
</script>
