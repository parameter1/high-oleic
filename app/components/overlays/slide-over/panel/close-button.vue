<template>
  <button
    aria-label="Close panel"
    :class="classes"
    @click.stop="$emit('click', $event)"
  >
    <icon-close class="h-6 w-6" />
  </button>
</template>

<script>
import IconClose from '../../../icons/close-md.vue';

export default {
  components: { IconClose },

  data: () => ({
    classes: [
      'text-gray-300',
      'hover:text-white',
      'transition',
      'ease-in-out',
      'duration-150',
    ],
  }),
};
</script>
