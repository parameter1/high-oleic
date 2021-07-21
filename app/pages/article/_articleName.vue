<template>
  <div class="grid grid-cols-1 md:grid-cols-2">
    <div v-if="displayArticle[0]" class="md:pl-40 md:pt-20">
      <h1 class="text-5xl">{{ displayArticle[0].name }}</h1>
      <div class="py-4" v-html="displayArticle[0].body" />
    </div>
    <div v-else>
      404 PAGE NOT FOUND
    </div>
    <div />
  </div>
</template>
<script>
import articles from '../../../server/src/articles/articles';

export default {
  data: () => ({
    articles,
  }),
  computed: {
    currentPageName() {
      return this.$route.params.articleName.replace(/-/g, ' ');
    },
    displayArticle() {
      const internalArticles = this.articles.filter((item) => item.alias === this.$route.path);
      return internalArticles;
    },
  },
  methods: {
    toTitleCase(string) {
      const internalString = string.split(' ')
        .map((word) => word[0].toUpperCase() + word.substr(1).toLowerCase())
        .join(' ');
      return internalString;
    },
  },
  head() {
    return {
      title: this.toTitleCase(this.currentPageName),
    };
  },
};
</script>
