<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <div class="p-4">
        <div class="bg-white shadow rounded-lg p-4 max-w-4xl">
          <h1 class="text-3xl font-semibold mb-5">
            {{ article.title }}
          </h1>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="prose prose-lg prose-blue" v-html="article.body" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { LOAD_ARTICLE } from '../../graphql/queries';

export default {
  apollo: {
    article: {
      query: LOAD_ARTICLE,
      fetchPolicy: 'cache-and-network',
      variables() {
        return { slug: this.slug };
      },
      prefetch: true,
    },
  },

  data: () => ({
    article: {},
  }),

  computed: {
    slug() {
      return this.$route.params.slug;
    },
  },

  head() {
    return {
      title: this.article.title,
    };
  },
};
</script>
