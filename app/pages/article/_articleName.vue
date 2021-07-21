<template>
  <div>
    <div v-html="displayArticle[0].body" />
  </div>
</template>
<script>
import articles from '../../../server/src/articles/articles';

export default {
  data: () => ({
    articles,
  }),
  computed: {
    displayArticle() {
      const internalArticles = this.articles.filter((item) => item.alias === this.$route.path);
      return internalArticles;
    },
  },
};
</script>
