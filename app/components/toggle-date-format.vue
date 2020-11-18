<template>
  <a
    v-if="timestamp"
    href="#toggle-date-format"
    class="border-b border-dotted focus:outline-none focus:shadow-outline-gray rounded"
    aria-label="Toggle date format"
    :title="title"
    @click.prevent="relative = !relative"
  >
    {{ value }}
  </a>
</template>

<script>
import dayjs from '../dayjs';

export default {
  props: {
    timestamp: {
      type: Number,
      default: null,
    },
    format: {
      type: String,
      default: 'MMM D, YYYY h:mma',
    },
  },

  data: () => ({
    relative: true,
  }),

  computed: {
    converted() {
      const { timestamp } = this;
      if (!timestamp) return null;
      return dayjs(timestamp);
    },

    formatted() {
      const { converted } = this;
      if (!converted) return null;
      return converted.format(this.format);
    },

    fromNow() {
      const { converted } = this;
      if (!converted) return null;
      return converted.fromNow();
    },

    title() {
      if (!this.timestamp) return null;
      const { relative } = this;
      if (relative) return this.formatted;
      return this.fromNow;
    },

    value() {
      if (!this.timestamp) return null;
      const { relative } = this;
      if (relative) return this.fromNow;
      return this.formatted;
    },
  },
};
</script>
