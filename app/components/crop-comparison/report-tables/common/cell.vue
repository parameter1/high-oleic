<template>
  <td :class="classes">
    <slot />
  </td>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'logo-blue',
      validator: (color) => ['logo-brown', 'logo-blue', 'primary-1'].includes(color),
    },
    fontWeight: {
      type: String,
      default: 'normal',
      validator: (fontWeight) => ['normal', 'medium', 'semibold'].includes(fontWeight),
    },
    fontSize: {
      type: String,
      default: 'sm',
      validator: (fontSize) => ['base', 'sm', 'xs'].includes(fontSize),
    },
    paddingY: {
      type: String,
      default: 'sm',
      validator: (paddingY) => ['xs', 'sm'].includes(paddingY),
    },
  },
  computed: {
    classes() {
      const classes = ['px-4', 'print:px-2', 'print:leading-none'];
      const {
        color,
        fontWeight,
        fontSize,
        paddingY,
      } = this;
      if (paddingY === 'sm') classes.push('py-2', 'print:py-0.5');
      if (paddingY === 'xs') classes.push('py-1', 'print:py-0.5');
      if (color === 'logo-blue') classes.push('text-logo-blue');
      if (color === 'logo-brown') classes.push('text-logo-brown');
      if (color === 'primary-1') classes.push('text-primary-1');
      if (fontWeight === 'medium') classes.push('font-medium');
      if (fontWeight === 'semibold') classes.push('font-semibold');
      if (fontSize === 'xs') classes.push('text-xs');
      if (fontSize === 'sm') classes.push('text-sm', 'print:text-xxs');
      if (fontSize === 'base') classes.push('text-base', 'print:text-xs');
      return classes;
    },
  },
};
</script>
