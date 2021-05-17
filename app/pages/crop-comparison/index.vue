<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <div class="p-4">
        <client-only>
          <page-header slot="placeholder" is-loading>
            Calculate Profit Potential
          </page-header>
          <page-header :is-loading="isLoading">
            Calculate Profit Potential
          </page-header>

          <div class="flex flex-wrap mb-1">
            <btn
              class="shadow mr-3 mb-3"
              :disabled="!hasToken"
              @click="$router.push('/crop-comparison/create')"
            >
              Create New Scenario
            </btn>
            <site-link
              v-if="false"
              class="shadow mr-3 mb-3"
              color="secondary-3"
              href="/profit-calculator-faq-03-12-20.pdf"
              target="_blank"
              rel="noopener"
            >
              Frequently Asked Questions
            </site-link>
            <site-link
              v-if="false"
              class="shadow mb-3"
              color="secondary-3"
              href="https://www.youtube.com/watch?v=nEZzA42Wa2c"
              target="_blank"
              rel="noopener"
            >
              Demonstration Video
            </site-link>
          </div>

          <div v-if="!hasToken">
            <p class="mb-4 text-lg font-medium text-logo-blue">
              How to get started:
            </p>
            <p>
              Step 1: Click
              <nuxt-link
                :to="{ path: '/login', query: { r: $route.path } }"
                class="text-logo-green font-medium hover:underline"
              >
                Login/Register.
              </nuxt-link>
            </p>
            <p>Step 2: Enter your email address and click "Send login link."</p>
            <p>
              Step 3: You will receive a personal login link via email.
              Within it, click "Login to High Oil Soy."
            </p>
            <p>Step 4: Create your personalized scenario.</p>
          </div>
          <div v-else>
            <!-- Query error -->
            <alert v-if="error" type="danger" class="mb-5 shadow-sm">
              {{ error.message }}
            </alert>

            <p class="mb-2 px-2 text-sm text-cool-gray-500">
              Total Scenarios: {{ myCropComparisons.totalCount }}
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
                :list-query="$apollo.queries.myCropComparisons"
              />
            </transition-group>

            <ag-view-solutions class="mt-6" />
          </div>
        </client-only>
        <nuxt-child :list-query="$apollo.queries.myCropComparisons" />
      </div>
    </div>
  </div>
</template>

<script>
import AgViewSolutions from '../../components/ag-view-solutions.vue';
import Alert from '../../components/common/alert.vue';
import Btn from '../../components/common/button.vue';
import SiteLink from '../../components/common/link.vue';
import ListItem from '../../components/crop-comparison/list-item.vue';
import PageHeader from '../../components/crop-comparison/page-header.vue';

import { LIST_CROP_COMPARISONS } from '../../graphql/queries';
import GraphQLError from '../../utils/graphql-error';

export default {
  components: {
    AgViewSolutions,
    Alert,
    Btn,
    SiteLink,
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
    title: 'Calculate Profit Potential',
  },
};
</script>
