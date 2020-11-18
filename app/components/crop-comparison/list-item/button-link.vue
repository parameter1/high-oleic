<template>
  <div :class="containerClasses">
    <nuxt-link
      :to="to"
      :class="linkClasses"
    >
      <slot name="icon" />
      <span class="ml-3">
        {{ label }}
      </span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: 'left',
      validator: (position) => ['left', 'right'].includes(position),
    },
  },

  computed: {
    containerClasses() {
      const classes = ['w-0', 'flex', 'flex-1'];
      const { position } = this;
      if (position === 'left') classes.push('border-r', 'border-gray-200');
      if (position === 'right') classes.push('-ml-px');
      return classes;
    },

    linkClasses() {
      const classes = [
        'relative',
        'w-0',
        'flex-1',
        'inline-flex',
        'items-center',
        'justify-center',
        'py-4',
        'text-sm',
        'leading-5',
        'text-logo-blue',
        'font-medium',
        'border',
        'border-transparent',
        'hover:text-logo-brown',
        'focus:outline-none',
        'focus:shadow-outline-secondary-5',
        'focus:border-secondary-5',
        'focus:z-10',
        'transition',
        'ease-in-out',
        'duration-150',
      ];
      const { position } = this;
      if (position === 'left') classes.push('-mr-px', 'rounded-bl-lg');
      if (position === 'right') classes.push('rounded-br-lg');
      return classes;
    },
  },
};
</script>
