<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <div class="p-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 sm:justify-items-center md:py-10">
          <div v-if="displayArticle[0]" class="pt-5 rounded-lg shadow">
            <h1 class="text-4xl font-semibold text-center md:text-left md:px-4">
              {{ displayArticle[0].name }}
            </h1>
            <div class="py-4 px-4" v-html="displayArticle[0].body" />
          </div>
          <div />
        </div>
      </div>
    </div>
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
      return this.$route.params.slug.replace(/-/g, ' ');
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
