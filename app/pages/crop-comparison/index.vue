<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="w-100%">
      <div class="p-8 flex justify-between flex-col md:flex-row">
        <client-only>
          <page-header slot="placeholder" is-loading>
            Calculate Profit Potential
          </page-header>
          <div class="flex flex-col justify-start" :is-loading="isLoading">
            <page-header>
              Calculate Profit Potential
            </page-header>
            <div v-html="sectionText" />
          </div>
          <div class="flex flex-wrap self-start mb-1 pt-8 md:pt-0 ">
            <a href="/profit-calculator-tool-tutorial.pdf" target="_blank">
              <btn class="shadow mr-3 mb-3" color="logo-white-rd">
                Instruction Guide
              </btn>
            </a>
            <a href="https://drive.google.com/file/d/1j-ATyJjJw56-QSNaLaech2u8uu-KmGzY/view" target="_blank">
              <btn class="shadow mr-3 mb-3" color="logo-white-rd">
                Video Tutorial
              </btn>
            </a>
            <a href="/profit-calculator-faq-03-12-20.pdf" target="_blank">
              <btn class="shadow mr-3 mb-3" color="logo-white-rd">
                FAQ
              </btn>
            </a>
            <a :disabled="!hasToken" @click="$router.push('/crop-comparison/create')">
              <btn class="shadow mb-3" color="logo-white-rd">
                New Scenario
              </btn>
            </a>
          </div>
        </client-only>
      </div>
      <div class="p-8 bg-gray-200">
        <client-only>
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
            <p class="mb-4 mt-8 text-lg font-medium text-logo-blue">
              How-To Video:
            </p>
            <video width="100%" height="auto" controls>
              <source src="https://img.highoilsoy.com/Profit+Calculator+Tool+How+To.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
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
import ListItem from '../../components/crop-comparison/list-item.vue';
import PageHeader from '../../components/crop-comparison/page-header.vue';

import { LIST_CROP_COMPARISONS } from '../../graphql/queries';
import GraphQLError from '../../utils/graphql-error';

export default {
  components: {
    AgViewSolutions,
    Alert,
    Btn,
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
    sectionText: '<p>Decide for yourself what your farm’s profit potential could be by using our Profit Manager tool.</p><p>Follow the instructions below to build your customized profit profile.</p>',
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
