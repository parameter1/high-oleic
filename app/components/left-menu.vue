<template>
  <aside class="flex">
    <!-- Off-canvas menu for mobile -->
    <mobile-menu
      :value="value"
      @input="$emit('input', $event)"
    />
    <!-- Static sidebar for desktop -->
    <desktop-menu />
  </aside>
</template>

<script>
import DesktopMenu from './left-menu/desktop.vue';
import MobileMenu from './left-menu/mobile.vue';

export default {
  components: { DesktopMenu, MobileMenu },

  props: {
    /**
     * Whether the mobile menu is currently open.
     */
    value: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
