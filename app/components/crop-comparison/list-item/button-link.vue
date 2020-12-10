<template>
  <div :class="containerClasses">
    <nuxt-link
      v-if="to"
      :to="to"
      :class="linkClasses"
    >
      <slot name="icon" />
      <span class="ml-1">
        {{ label }}
      </span>
    </nuxt-link>
    <button
      v-else
      :class="linkClasses"
      :disabled="disabled || loading"
      @click="$emit('click', $event)"
    >
      <loading-spinner v-show="loading" :with-label="false" />
      <slot v-if="!loading" name="icon" />
      <span class="ml-1">
        {{ label }}
      </span>
    </button>
  </div>
</template>

<script>
import LoadingSpinner from '../../common/loading-spinner.vue';

export default {
  components: { LoadingSpinner },

  props: {
    to: {
      type: [String, Object],
      default: null,
    },
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'left',
      validator: (position) => ['left', 'right', 'center'].includes(position),
    },
  },

  computed: {
    containerClasses() {
      const classes = ['w-0', 'flex', 'flex-1'];
      const { position } = this;
      if (position === 'left') classes.push('border-r', 'border-gray-200');
      if (position === 'center') classes.push('border-r', 'border-gray-200');
      if (position === 'right') classes.push('-ml-px');
      return classes;
    },

    linkClasses() {
      const classes = [
        'relative',
        'w-0',
        'flex-1',
        'inline-flex',
        'items-center',
        'justify-center',
        'py-4',
        'text-sm',
        'leading-5',
        'text-logo-blue',
        'font-medium',
        'border',
        'border-transparent',
        'hover:text-logo-brown',
        'focus:outline-none',
        'focus:shadow-outline-secondary-5',
        'focus:border-secondary-5',
        'focus:z-10',
        'transition',
        'ease-in-out',
        'duration-150',
      ];
      const { position } = this;
      if (position === 'left') classes.push('-mr-px', 'rounded-bl-lg');
      if (position === 'right') classes.push('rounded-br-lg');
      return classes;
    },
  },
};
</script>
