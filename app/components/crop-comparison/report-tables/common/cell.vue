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
      validator: (fontSize) => ['base', 'sm'].includes(fontSize),
    },
  },
  computed: {
    classes() {
      const classes = ['px-4', 'py-2'];
      const { color, fontWeight, fontSize } = this;
      if (color === 'logo-blue') classes.push('text-logo-blue');
      if (color === 'logo-brown') classes.push('text-logo-brown');
      if (color === 'primary-1') classes.push('text-primary-1');
      if (fontWeight === 'medium') classes.push('font-medium');
      if (fontWeight === 'semibold') classes.push('font-semibold');
      if (fontSize === 'sm') classes.push('text-sm');
      if (fontSize === 'base') classes.push('text-base');
      return classes;
    },
  },
};
</script>
