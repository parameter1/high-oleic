<template>
  <button
    :type="type === 'submit' ? 'submit' : 'button'"
    :class="classes"
    :disabled="disabled || isLoading"
    @click="$emit('click', $event)"
  >
    <span class="sr-only">
      {{ label }}
    </span>
    <component
      :is="icon"
      v-if="showIcon"
      class="w-5 h-5"
    />
    <loading-spinner
      v-if="type === 'submit' && isLoading"
      color="gray-700"
      :with-label="false"
    />
  </button>
</template>

<script>
import CancelIcon from '../icons/x-sm.vue';
import SaveIcon from '../icons/check-sm.vue';
import LoadingSpinner from '../common/loading-spinner.vue';

export default {
  components: { LoadingSpinner },

  props: {
    type: {
      type: String,
      required: true,
      validator: (type) => ['submit', 'cancel'].includes(type),
    },
    isLoading: {
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
      const classes = [
        '-ml-px',
        'relative',
        'inline-flex',
        'items-center',
        'px-3',
        'py-2',
        'border',
        'border-gray-300',
        'text-sm',
        'font-medium',
        'hover:bg-gray-50',
        'focus:outline-none',
        'focus-within:z-10',
        'disabled:cursor-not-allowed',
        'disabled:bg-gray-300',
        'disabled:text-gray-700',
      ];
      const { type } = this;
      if (type === 'submit') classes.push('text-green-500', 'focus:border-green-300', 'focus:shadow-outline-green');
      if (type === 'cancel') classes.push('text-red-500', 'focus:border-red-300', 'focus:shadow-outline-red', 'rounded-r-md');
      return classes;
    },
    label() {
      if (this.type === 'submit') return 'Save';
      return 'Cancel';
    },
    icon() {
      switch (this.type) {
        case 'submit':
          return SaveIcon;
        case 'cancel':
          return CancelIcon;
        default:
          return 'span';
      }
    },
    showIcon() {
      const { type } = this;
      if (type === 'cancel') return true;
      return !this.isLoading;
    },
  },
};
</script>
