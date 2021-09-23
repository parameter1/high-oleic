<template>
  <nuxt-link
    :to="to"
    :exact="exact"
    :class="classes"
    :active-class="activeClasses"
    @click.native="$emit('click', $event)"
  >
    <slot />
  </nuxt-link>
</template>

<script>

export default {
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
    exact: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'desktop',
      validator: (v) => ['desktop', 'mobile'].includes(v),
    },
  },

  data: () => ({
    activeClassDefs: {
      common: ['text-logo-blue', 'bg-secondary-5-200'],
      desktop: [],
      mobile: [],
    },
    classDefs: {
      common: [
        'group',
        'flex',
        'flex-col',
        'px-2',
        'py-6',
        'font-medium',
        'text-logo-blue',
        'hover:text-logo-blue',
        'hover:bg-secondary-5-200',
        'focus:outline-none',
        'transition',
        'ease-in-out',
        'duration-150',
        'menu-item-link',
      ],
      desktop: ['text-base', 'leading-6'],
      mobile: ['text-base', 'leading-6'],
    },
  }),

  computed: {
    activeClasses() {
      return [...this.activeClassDefs.common, ...this.activeClassDefs[this.size]].join(' ');
    },
    classes() {
      return [...this.classDefs.common, ...this.classDefs[this.size]];
    },
  },
};
</script>
