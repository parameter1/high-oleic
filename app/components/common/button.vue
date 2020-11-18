<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="classes"
    @click="$emit('click', $event)"
  >
    <loading-spinner
      color="white"
      :show="loading"
    />
    <slot />
  </button>
</template>

<script>
import LoadingSpinner from './loading-spinner.vue';

export default {
  components: { LoadingSpinner },

  props: {
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value),
    },
    flavor: {
      type: String,
      default: 'logo-blue',
      validator: (value) => [
        'logo-blue',
      ].includes(value),
    },
    block: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      const core = [
        'flex',
        'justify-center',
        'py-2',
        'px-4',
        'border',
        'border-transparent',
        'text-sm',
        'font-bold',
        'rounded-md',
        'text-white',
        'focus:outline-none',
        'disabled:cursor-not-allowed',
        'transition',
        'duration-150',
        'ease-in-out',
        'shadow-sm',
        'items-center',
      ];
      if (this.block) {
        core.push('w-full');
      }
      const flavors = {
        'logo-blue': [
          'bg-logo-blue',
          'hover:bg-opacity-85',
          'focus:bg-opacity-85',
          'focus:border-logo-blue',
          'focus:shadow-outline-gray',
          'active:bg-opacity-85',
        ],
      };
      const flavor = flavors[this.flavor];
      if (!flavor) return core;
      return [...core, ...flavor];
    },
  },
};
</script>
