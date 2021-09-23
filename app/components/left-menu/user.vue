<template>
  <div class="flex-shrink-0 flex border-t border-gray-200 manage-profile">
    <client-only>
      <nav class="flex-1">
        <nav-item-link :to="to">
          <div class="flex justify-center w-100%">
            <svg
              class="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="d"
              />
            </svg>
            &nbsp;
            {{ label }}
          </div>
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

  data: () => ({
    d: 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  }),

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
      if (this.hasToken) return 'Farmers Dashboard';
      return 'Farmers Dashboard';
    },

    to() {
      if (this.hasToken) return '/logout';
      return '/login';
    },
  },
};
</script>
