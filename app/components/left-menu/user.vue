<template>
  <div class="flex-shrink-0 flex border-t border-gray-200 py-4">
    <client-only>
      <nav class="px-6 flex-1">
        <nav-item-link :to="to">
          {{ label }}
        </nav-item-link>
      </nav>
    </client-only>
  </div>
</template>

<script>
import NavItemLink from './link.vue';

export default {
  components: {
    NavItemLink,
  },

  computed: {
    /**
     *
     */
    hasToken() {
      return this.$apolloHelpers.getToken();
    },

    /**
     *
     */
    label() {
      if (this.hasToken) return 'Logout';
      return 'Login / Register';
    },

    to() {
      if (this.hasToken) return '/logout';
      return '/login';
    },
  },
};
</script>
