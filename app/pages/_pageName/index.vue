<template>
  <div class="h-screen bg-primary-1 overflow-y-scroll">
    <!-- Replace with your content -->
    <div class="py-4 h-full text-white">
      <div v-if="acceptedRoutes.includes($route.params.pageName)" class="md:pl-20">
        <h1 v-if="currentPageName === 'why high oleic'" class="text-5xl capitalize">
          {{ currentPageName }}?
        </h1>
        <h1 v-else class="text-5xl capitalize">
          {{ currentPageName }}
        </h1>
        <div
          v-if="currentPageName !== 'find your seed'"
          class="py-40 grid grid-cols-1 md:grid-cols-2"
        >
          <div v-for="article in articles" :key="article.name">
            <home-page-article-block
              v-if="article.scheduledSections.includes($route.params.pageName)"
              :article-title="article.name"
              :article-tease="article.teaser"
              :link-location="article.alias"
            />
          </div>
        </div>
        <div v-else class="py-40 grid grid-cols-1 md:w-4/5">
          <home-page-block
            section-label="Seed Selection"
            button-label="Seed Selector"
            link-location="/seed-selection"
          />
          <div class="py-10" />
          <home-page-block
            section-label="Find Your Elevator"
            button-label="Find Your Elevator"
            link-location="/find-your-elevator"
          />
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
import HomePageBlock from '../../components/common/home-page-block.vue';
import HomePageArticleBlock from '../../components/common/home-page-article-block.vue';
import articles from '../../../server/src/articles/articles';

export default {
  components: {
    HomePageBlock,
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
