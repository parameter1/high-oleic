<template>
  <input
    :class="classes"
    :value="value"
    @input="$emit('input', $event.target.value)"
    @change="$emit('change', $event.target.value)"
    @focus="handleFocus"
    @keyup.esc="$emit('escape', $event)"
  >
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
    autoSelect: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    classes() {
      return [
        'appearance-none',
        'block',
        'w-full',
        'px-3',
        'py-2',
        'border',
        'border-cool-gray-300',
        'rounded-md',
        'placeholder-cool-gray-400',
        'focus:outline-none',
        'focus:shadow-outline-secondary-5',
        'focus:border-secondary-5',
        'disabled:border-cool-gray-300',
        'disabled:bg-cool-cool-gray-50',
        'disabled:cursor-not-allowed',
        'transition',
        'duration-150',
        'ease-in-out',
        'sm:text-sm',
        'sm:leading-5',
        'shadow-sm',
      ];
    },
  },

  mounted() {
    if (this.autoFocus) this.$el.focus();
  },

  methods: {
    handleFocus(event) {
      if (this.autoSelect) this.$el.select();
      this.$emit('focus', event);
    },
  },
};
</script>
