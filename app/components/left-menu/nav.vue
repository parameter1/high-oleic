<template>
  <nav :class="classes">
    <div
      v-for="(item, index) in navItems"
      :key="index"
      class="p-4 menu-item-link-wrapper"
    >
      <nav-item-link
        :to="item.to"
        :exact="item.exact"
        :icon-component="item.icon"
        :size="size"
        @click="$emit('nav-item-click', { item, event: $event })"
      >
        <div class="menu-item-link-contents flex flex-col">
          {{ item.label }}
          <span
            v-if="item.subLabel"
            class="text-xs text-black italic"
          >
            {{ item.subLabel }}
          </span>
        </div>
      </nav-item-link>
    </div>
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
      common: ['px-4', 'menu-item'],
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
