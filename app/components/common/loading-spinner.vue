<template>
  <svg
    v-show="show"
    :class="classes"
    fill="none"
    viewBox="0 0 24 24"
    title="Loading..."
    aria-label="Loading..."
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    />
    <!-- eslint-disable-next-line -->
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: 'logo-blue',
      validator: (color) => ['logo-blue', 'white', 'gray-700'].includes(color),
    },
    size: {
      type: String,
      default: 'medium',
      validator: (size) => ['medium', 'large', 'xl'].includes(size),
    },
    withLabel: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    classes() {
      const { color, size, withLabel } = this;
      const classes = ['animate-spin-fast'];
      if (withLabel) classes.push('-ml-1', 'mr-2');
      if (color === 'logo-blue') classes.push('text-logo-blue');
      if (color === 'white') classes.push('text-white');
      if (color === 'gray-700') classes.push('text-gray-700');
      if (size === 'medium') classes.push('w-5', 'h-5');
      if (size === 'large') classes.push('w-8', 'h-8');
      if (size === 'xl') classes.push('w-10', 'h-10');
      return classes;
    },
  },
};
</script>
