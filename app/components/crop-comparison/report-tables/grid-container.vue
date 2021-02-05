<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script>
export default {
  data: () => ({
    classes: [
      'grid',
      'grid-cols-1',
      'gap-4',
      'print:gap-2',
      'md:grid-cols-2',
      'print:grid-cols-2',
    ],
  }),
};
</script>
