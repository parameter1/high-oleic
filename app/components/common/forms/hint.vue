<template>
  <p
    v-if="value"
    class="text-sm font-normal font-serif text-cool-gray-600 leading-5 mt-1 px-1"
  >
    {{ value }}
  </p>
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
