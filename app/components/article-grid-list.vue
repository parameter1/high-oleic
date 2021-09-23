<template>
  <div :class="containerClasses">
    <slot name="grid-before" />
    <home-page-article-block
      v-for="article in articles"
      :key="article.id"
      :title="article.title"
      :image="article.image"
      :teaser="article.teaser"
      :href="`/article/${article.slug}`"
    />
    <slot name="grid-after" />
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
    alias: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    articles: [],
    containerClasses: [
      'grid',
      'grid-cols-1',
      'sm:grid-cols-2',
      'md:grid-cols-4',
      'gap-4',
    ],
  }),
};
</script>
