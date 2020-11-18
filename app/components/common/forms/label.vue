<template>
  <label :class="classes">
    <slot />
  </label>
</template>

<script>
export default {
  data: () => ({
    classes: [
      'block',
      'text-sm',
      'font-medium',
      'leading-5',
      'text-cool-gray-700',
    ],
  }),
};
</script>
