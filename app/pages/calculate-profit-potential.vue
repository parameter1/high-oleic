<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <div class="p-4">
        <h1 class="text-2xl mb-4">
          Calculate Profit Potential
        </h1>
        <p v-if="!hasToken">
          You must be
          <nuxt-link
            class="text-blue-500"
            :to="{ path: '/login', query: { r: '/calculate-profit-potential' } }"
          >
            logged in
          </nuxt-link>
          to run profit scenerios.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // asyncData({ app }) {
  //   this.hasToken = !!app.$apolloHelpers.getToken();
  // },

  computed: {
    hasToken() {
      return this.$apolloHelpers.getToken();
    },
  },

  head: {
    title: 'Caclulate Profit Potential',
  },
};
</script>
