<template>
  <span>
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
  },

  computed: {
    formatted() {
      const { value, format } = this;
      if (value == null || !format) return value;
      const func = formatNumber[format];
      return func(value);
    },
  },
};
</script>
