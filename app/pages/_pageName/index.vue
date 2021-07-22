<template>
  <div class="h-screen overflow-y-scroll">
    <!-- Replace with your content -->
    <div class="py-4 h-full">
      <div v-if="acceptedRoutes.includes($route.params.pageName)">
        <div class="md:pl-20">
          <h1
            v-if="currentPageName === 'why high oleic'"
            class="text-5xl capitalize font-semibold text-center md:text-left"
          >
            {{ currentPageName }}?
          </h1>
          <h1 v-else class="text-5xl capitalize font-semibold text-center md:text-left">
            {{ currentPageName }}
          </h1>
        </div>
        <div
          v-if="currentPageName !== 'find your seed'"
          class="pt-40 grid grid-cols-1 lg:grid-cols-3 border-secondary-5-300 border-b-2"
        >
          <div
            v-for="article in displayArticles"
            :key="article.name"
            class="py-10 border-secondary-5-300 border-t-2 md:pl-52 lg:pl-20"
          >
            <home-page-article-block
              :article-title="article.name"
              :article-tease="article.teaser"
              :link-location="article.alias"
            />
          </div>
        </div>
        <div
          v-else
          class="pt-40 grid grid-cols-1 lg:grid-cols-3 border-secondary-5-300 border-b-2"
        >
          <div
            v-for="article in displayArticles"
            :key="article.name"
            class="py-4 border-secondary-5-300 border-t-2 md:pl-20"
          >
            <home-page-article-block
              :article-title="article.name"
              :article-tease="article.teaser"
              :link-location="article.alias"
            />
          </div>
          <div class="py-4 border-secondary-5-300 border-t-2">
            <home-page-article-block
              article-title="Find Your Elevator"
              article-tease=""
              link-location="/find-your-elevator"
              button-label="Find Your Elevator"
            />
          </div>
        </div>
        <!-- /End replace -->
      </div>
      <div v-else>
        <h1>404 PAGE NOT FOUND</h1>
      </div>
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
    acceptedRoutes: [
      'why-high-oleic',
      'find-your-seed',
      'knowledge-center',
      'market-analysis',
    ],
    notHome: true,
  }),
  computed: {
    currentPageName() {
      return this.$route.params.pageName.replace(/-/g, ' ');
    },
    displayArticles() {
      const internalArticles = this.articles.filter((item) => item.scheduledSections.includes(this.$route.params.pageName)); // eslint-disable-line
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
