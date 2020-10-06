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
      common: ['text-white', 'bg-gray-900', 'hover:bg-gray-900'],
      desktop: [],
      mobile: [],
    },
    classDefs: {
      common: [
        'group',
        'flex',
        'items-center',
        'pr-2',
        'pl-4',
        'py-2',
        'font-medium',
        'rounded-l-full',
        'text-gray-300',
        'hover:text-white',
        'hover:bg-gray-700',
        'focus:outline-none',
        'transition',
        'ease-in-out',
        'duration-150',
      ],
      desktop: ['text-sm', 'leading-5'],
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
