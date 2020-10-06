<template>
  <transition
    enter-active-class="transition-opacity ease-in-out duration-75"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity ease-in-out duration-75"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <button
      v-show="show"
      :class="classes"
      aria-label="Close sidebar"
      @click="$emit('click', $event)"
    >
      <close-icon class="h-6 w-6 text-white" />
    </button>
  </transition>
</template>

<script>
import CloseIcon from '../icons/close-md.vue';

export default {
  components: { CloseIcon },

  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    classes: [
      'flex',
      'items-center',
      'justify-center',
      'h-12',
      'w-12',
      'rounded-full',
      'focus:outline-none',
      'focus:bg-gray-600',
    ],
  }),
};
</script>
