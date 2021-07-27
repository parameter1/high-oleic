<template>
  <div class="pt-2 pb-6 md:py-6 overflow-y-scroll">
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <div class="p-4">
        <div class="h-screen">
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
import HomePageBlock from '../components/common/home-page-block.vue';
import ArticleGridList from '../components/article-grid-list.vue';

export default {
  components: {
    ArticleGridList,
    HomePageBlock,
  },

  data: () => ({
    isFirst: true,
  }),

  head: {
    title: 'Home',
  },
};
</script>
