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
      'text-gray-500',
      'focus:outline-none',
      'focus:bg-gray-100',
      'focus:text-gray-600',
      'md:hidden',
    ],
  }),
};
</script>
