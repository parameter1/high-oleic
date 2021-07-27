<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <div class="p-4">
        <h1 class="text-3xl font-semibold mb-8">
          {{ title }}
        </h1>
        <div :class="containerClasses">
          <slot name="grid-before" />
          <home-page-article-block
            v-for="article in articles"
            :key="article.id"
            :title="article.title"
            :teaser="article.teaser"
            :href="`/article/${article.slug}`"
          />
          <slot name="grid-after" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LOAD_ARTICLES_FOR_SECTION } from '../graphql/queries';
import HomePageArticleBlock from './common/home-page-article-block.vue';

export default {
  components: {
    HomePageArticleBlock,
  },

  apollo: {
    articles: {
      query: LOAD_ARTICLES_FOR_SECTION,
      fetchPolicy: 'cache-and-network',
      variables() {
        return { alias: this.alias };
      },
      prefetch: true,
    },
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    articles: [],
    containerClasses: [
      'grid',
      'grid-cols-1',
      'md:grid-cols-2',
      'lg:grid-cols-4',
      'gap-4',
    ],
  }),

  computed: {
    alias() {
      return this.path.replace(/^\//, '');
    },
  },

  head() {
    return {
      title: this.title,
    };
  },
};
</script>
