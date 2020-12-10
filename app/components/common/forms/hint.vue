<template>
  <div class="text-sm font-normal font-serif px-1 leading-5 mt-1">
    <slot>
      <span
        v-if="value"
        class="text-cool-gray-600"
        v-html="value"
      />
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null,
    },
  },
};
</script>
