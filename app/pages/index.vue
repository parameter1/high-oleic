<template>
  <div class="h-screen overflow-y-scroll">
    <!-- Replace with your content -->
    <home-page-block
      section-label="Why High Oleic?"
      button-label="Learn More"
      :is-first="isFirst"
      link-location="/why-high-oleic"
    />
    <div class="border-secondary-5-300 border-b-2" />
    <home-page-block
      section-label="Calculate"
      button-label="Profit Potential Calculator"
      link-location="/crop-comparison"
    />
    <div class="border-secondary-5-300 border-b-2" />
    <home-page-block
      section-label="Find Your Seed"
      button-label="Find Your Seed"
      link-location="/find-your-seed"
    />
    <div class="border-secondary-5-300 border-b-2" />
    <div class="pt-10">
      <h2 class="text-4xl font-semibold text-center md:text-left md:pl-20">
        Knowledge Center
      </h2>
      <div class="py-2 grid grid-cols-1 md:grid-cols-3 md:pl-20 border-secondary-5-300 border-b-2">
        <div v-for="(article,index) in knowledgeCenterArticles" :key="article.name" class="py-4">
          <div v-if="index < 3">
            <home-page-article-block
              :article-title="article.name"
              :article-tease="article.teaser"
              :link-location="article.alias"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="pt-10">
      <h2 class="text-4xl font-semibold text-center md:text-left md:pl-20">
        Market Analysis
      </h2>
      <div class="py-2 grid grid-cols-1 md:grid-cols-3 md:pl-20 border-secondary-5-300 border-b-2">
        <div v-for="article in marketAnalysisArticles" :key="article.name" class="py-4">
          <home-page-article-block
            :article-title="article.name"
            :article-tease="article.teaser"
            :link-location="article.alias"
          />
        </div>
      </div>
    </div>
  <!-- /End replace -->
  </div>
</template>

<script>
import HomePageBlock from '../components/common/home-page-block.vue';
import HomePageArticleBlock from '../components/common/home-page-article-block.vue';
import articles from '../../server/src/articles/articles';

export default {
  components: {
    HomePageBlock,
    HomePageArticleBlock,
  },
  data: () => ({
    articles,
    isFirst: true,
  }),
  computed: {
    knowledgeCenterArticles() {
      const internalArticles = this.articles.filter((item) => item.scheduledSections.includes('knowledge-center')); // eslint-disable-line
      return internalArticles;
    },
    marketAnalysisArticles() {
      const internalArticles = this.articles.filter((item) => item.scheduledSections.includes('market-analysis')); // eslint-disable-line
      return internalArticles;
    },
  },
  head: {
    title: 'Home',
  },

};
</script>
