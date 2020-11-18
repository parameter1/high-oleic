<template>
  <div class="pt-2 pb-6 md:py-6">
    <create-comparison v-model="createOpen" />
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <div class="p-4">
        <h1 class="text-2xl mb-4 font-semibold">
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
        <p v-else-if="error">
          {{ error.message }}
        </p>
        <p v-else>
          <btn
            class="shadow"
            @click="createOpen = !createOpen"
          >
            Create New Scenerio
          </btn>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

import Btn from '../components/common/button.vue';
import CreateComparison from '../components/crop-comparison/create.vue';

import GraphQLError from '../utils/graphql-error';

export default {
  components: { Btn, CreateComparison },

  apollo: {
    ping: {
      query: gql`
        query Ping {
          ping
        }
      `,
      fetchPolicy: 'cache-and-network',
      error(e) { this.error = new GraphQLError(e); },
    },
  },

  data: () => ({
    createOpen: false,
    error: null,
    ping: null,
  }),

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
