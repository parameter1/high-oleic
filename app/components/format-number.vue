<template>
  <span :class="conditionalClasses">
    <slot :formatted="formatted">
      {{ formatted }}
    </slot>
  </span>
</template>

<script>
import formatNumber from '../utils/format-number';

export default {
  props: {
    value: {
      type: Number,
      default: null,
    },
    format: {
      type: String,
      default: null,
      validator: (format) => {
        if (!format) return true;
        return ['usd', 'integer', 'percent'].includes(format);
      },
    },
    withConditional: {
      type: Boolean,
      default: false,
    },
    darken: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    formatted() {
      const { value, format } = this;
      if (value == null || !format) return value;
      const func = formatNumber[format];
      return func(value);
    },

    conditionalClasses() {
      const classes = [];
      const { withConditional, value, darken } = this;
      if (!withConditional || value == null) return classes;
      if (value > 0) classes.push(darken ? 'text-green-800' : 'text-green-600');
      if (value < 0) classes.push(darken ? 'text-red-700' : 'text-red-500');
      return classes;
    },
  },
};
</script>
