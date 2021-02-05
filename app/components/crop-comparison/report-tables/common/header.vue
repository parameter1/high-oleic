<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator: (type) => ['primary', 'secondary'].includes(type),
    },
  },

  computed: {
    classes() {
      const { type } = this;
      const classes = ['border-secondary-5-300'];
      if (type === 'primary') {
        classes.push('p-4', 'print:p-2', 'border-b-2', 'text-lg', 'leading-6', 'font-bold', 'print:text-xs');
      }
      if (type === 'secondary') {
        classes.push('px-4', 'py-3', 'print:px-2', 'print:py-0.5', 'border-t-2', 'border-b-2', 'border-secondary-5-300', 'font-medium', 'text-base', 'print:text-xs', 'text-logo-green', 'font-medium');
      }
      return classes;
    },
    tag() {
      const { type } = this;
      switch (type) {
        case 'secondary':
          return 'h4';
        default:
          return 'h3';
      }
    },
  },
};
</script>
