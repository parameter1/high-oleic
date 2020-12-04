<template>
  <div class="p-4">
    <div v-if="isLoading">
      Loading...
    </div>
    <alert
      v-else-if="error"
      type="danger"
      class="mb-5 shadow-sm"
    >
      {{ error.message }}
    </alert>
    <div v-else>
      display
    </div>
  </div>
</template>

<script>
import Alert from '../../../components/common/alert.vue';

import { MODIFY_COMPARISON_FARM_INFO } from '../../../graphql/queries';
import GraphQLError from '../../../utils/graphql-error';

export default {
  components: {
    Alert,
  },

  apollo: {
    cropComparison: {
      query: MODIFY_COMPARISON_FARM_INFO,
      fetchPolicy: 'cache-and-network',
      variables() {
        return { id: this.comparisonId };
      },
      update({ cropComparison }) {
        return {
          ...cropComparison,
          comparedTo: { ...cropComparison.comparedTo },
        };
      },
      error(e) { console.log(e); this.error = new GraphQLError(e); },
      watchLoading(isLoading) {
        this.isLoading = isLoading;
        if (isLoading) this.error = null;
      },
      prefetch: false,
    },
  },

  props: {
    comparisonId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    error: null,
    isLoading: true,
    cropComparison: {
      comparedTo: {},
    },
    isSaving: false,
  }),

  methods: {
    /**
     *
     */
    save() {

    },
  },
};
</script>
