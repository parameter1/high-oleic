<template>
  <div class="h-screen overflow-y-scroll">
    <!-- Replace with your content -->
    <div class="py-4 bg-primary-1 h-full text-white md:pl-20">
      <h1 v-if="currentPageName === 'why high oleic'" class="text-5xl capitalize">
        {{ currentPageName }}?
      </h1>
      <h1 v-else class="text-5xl capitalize">
        {{ currentPageName }}
      </h1>
      <div class="py-40 grid grid-cols-1 md:grid-cols-2">
        <div v-for="article in articles" :key="article.name">
          <home-page-article-block
            v-if="article.scheduledSections.includes($route.params.pageName)"
            :article-title="article.name"
            :article-tease="article.teaser"
            :link-location="article.alias"
          />
        </div>
      </div>
    <!-- /End replace -->
    </div>
  </div>
</template>

<script>
import HomePageArticleBlock from '../../components/common/home-page-article-block.vue';
import articles from '../../../server/src/articles/articles';

export default {
  components: {
    HomePageArticleBlock,
  },
  data: () => ({
    articles,
  }),
  computed: {
    currentPageName() {
      return this.$route.params.pageName.replace(/-/g, ' ');
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
