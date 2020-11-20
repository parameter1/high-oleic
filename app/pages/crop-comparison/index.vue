<template>
  <div class="pt-2 pb-6 md:py-6">
    <create-comparison
      v-model="createOpen"
      :list-query="$apollo.queries.myCropComparisons"
    />
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <div class="p-4">
        <client-only>
          <page-header slot="placeholder" is-loading />
          <page-header :is-loading="isLoading" />

          <btn class="shadow mb-8" :disabled="!hasToken" @click="createOpen = !createOpen">
            Create New Scenerio
          </btn>

          <div v-if="!hasToken">
            <p class="mb-4 text-lg font-medium text-logo-blue">
              You must be logged in to access and create crop comparison scenerios.
            </p>
            <p>
              To continue, please
              <nuxt-link
                :to="{ path: '/login', query: { r: $route.path } }"
                class="text-logo-green font-medium hover:underline"
              >
                login or register
              </nuxt-link>
            </p>
          </div>
          <div v-else>
            <!-- Query error -->
            <alert v-if="error" type="danger" class="mb-5 shadow-sm">
              {{ error.message }}
            </alert>

            <p class="mb-2 px-2 text-sm text-cool-gray-500">
              Total Scenerios: {{ myCropComparisons.totalCount }}
            </p>

            <transition-group
              tag="ul"
              class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              enter-active-class="ease-in-out duration-150"
              enter-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="ease-in-out duration-150"
              leave-class="opacity-100"
              leave-to-class="opacity-0"
              mode="out-in"
            >
              <list-item
                v-for="node in nodes"
                :key="node.id"
                :node="node"
              />
            </transition-group>
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '../../components/common/alert.vue';
import Btn from '../../components/common/button.vue';
import CreateComparison from '../../components/crop-comparison/create.vue';
import ListItem from '../../components/crop-comparison/list-item.vue';
import PageHeader from '../../components/crop-comparison/page-header.vue';

import { LIST_CROP_COMPARISONS } from '../../graphql/queries';
import GraphQLError from '../../utils/graphql-error';

export default {
  components: {
    Alert,
    Btn,
    CreateComparison,
    ListItem,
    PageHeader,
  },

  apollo: {
    myCropComparisons: {
      query: LIST_CROP_COMPARISONS,
      fetchPolicy: 'cache-and-network',
      error(e) { this.error = new GraphQLError(e); },
      watchLoading(isLoading) {
        this.isLoading = isLoading;
        if (isLoading) this.error = null;
      },
      prefetch: false,
      skip() {
        return !this.hasToken;
      },
    },
  },

  data: () => ({
    createOpen: false,
    error: null,
    isLoading: false,
    myCropComparisons: {
      totalCount: 0,
      edges: [],
      pageInfo: { hasNextPage: false, endCursor: null },
    },
  }),

  computed: {
    /**
     *
     */
    nodes() {
      return this.myCropComparisons.edges.map((edge) => edge.node);
    },

    /**
     *
     */
    endCursor() {
      return this.myCropComparisons.pageInfo.endCursor;
    },

    /**
     *
     */
    hasToken() {
      return this.$apolloHelpers.getToken();
    },
  },

  head: {
    title: 'Caclulate Profit Potential',
  },
};
</script>
