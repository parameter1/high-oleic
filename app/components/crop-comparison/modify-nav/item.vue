<template>
  <nuxt-link
    :to="to"
    :class="classes"
  >
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },

  computed: {
    active() {
      return this.$route.matched.some((route) => {
        const match = route.regex.test(this.to) && /^crop-comparison-id/.test(route.name);
        return match;
      });
    },

    classes() {
      const classes = [
        'text-logo-blue',
        'hover:bg-secondary-5-200',
        'px-3',
        'py-2',
        'font-medium',
        'text-sm',
        'rounded-md',
      ];
      if (this.active) classes.push('bg-secondary-5-200');
      return classes;
    }
  },
};
</script>
