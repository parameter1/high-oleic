<template>
  <div class="pb-6 overflow-y-scroll">
    <page-intro-block
      section-label="Grow High Oleic Soy"
      section-tagline="The Yeild You Want. The Demand You Need."
      section-text="Today's High oleic soybeans — those with higher oleic acid content that eliminates the need for hydrogenation, thus making them a healthier alternative to conventional soybeans when processed for vegetable oil — fill the supply needs, with the required attributes"
      button-label="FIND OUT WHY"
      link-location="/why-high-oleic"
    />
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <div class="p-4">
        <div class="h-screen">
          <!-- Replace with your content -->
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
            <h2 class="text-3xl font-semibold mb-4">
              Knowledge Center
            </h2>
            <article-grid-list alias="knowledge-center" />
          </div>
          <div class="pt-10">
            <h2 class="text-3xl font-semibold mb-4">
              Market Analysis
            </h2>
            <article-grid-list alias="market-analysis" />
          </div>
          <!-- /End replace -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageIntroBlock from '../components/common/page-intro-block.vue';
import HomePageBlock from '../components/common/home-page-block.vue';
import ArticleGridList from '../components/article-grid-list.vue';

export default {
  components: {
    ArticleGridList,
    HomePageBlock,
    PageIntroBlock,
  },

  data: () => ({
    isFirst: true,
  }),

  head: {
    title: 'Home',
  },
};
</script>
