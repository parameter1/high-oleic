<template>
  <nav :class="classes">
    <nav-item-link
      v-for="(item, index) in navItems"
      :key="index"
      :to="item.to"
      :exact="item.exact"
      :icon-component="item.icon"
      :size="size"
      @click="$emit('nav-item-click', { item, event: $event })"
    >
      {{ item.label }}
    </nav-item-link>
  </nav>
</template>

<script>
import NavItemLink from './link.vue';
import navItems from './nav-items';

export default {
  components: {
    NavItemLink,
  },

  props: {
    size: {
      type: String,
      default: 'desktop',
      validator: (v) => ['desktop', 'mobile'].includes(v),
    },
  },

  data: () => ({
    navItems,
    classDefs: {
      common: ['px-2', 'space-y-1'],
      desktop: ['flex-1'],
      mobile: [],
    },
  }),

  computed: {
    classes() {
      return [...this.classDefs.common, ...this.classDefs[this.size]];
    },
  },
};
</script>
