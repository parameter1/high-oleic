<template>
  <button
    :class="classes"
    aria-label="Open left menu"
    @click="$emit('click', $event)"
  >
    <icon-menu class="h-6 w-6" />
  </button>
</template>

<script>
import IconMenu from './icons/menu-alt-2-md.vue';

export default {
  components: { IconMenu },

  data: () => ({
    classes: [
      'px-4',
      'border-r',
      'border-gray-200',
      'text-logo-blue',
      'focus:outline-none',
      'focus:bg-secondary-5-200',
      'focus:logo-blue',
      'print:hidden',
    ],
  }),
};
</script>
