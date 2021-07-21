<template>
  <div class="h-screen overflow-y-scroll">
    <!-- Replace with your content -->
    <home-page-block
      section-label="Why High Oleic?"
      button-label="Learn More"
      :is-first="isFirst"
      link-location="/why-high-oleic"
    />
    <home-page-block
      section-label="Calculate"
      button-label="Profit Potential Calculator"
      link-location="/crop-comparison"
    />
    <home-page-block
      section-label="Find Your Seed"
      button-label="Find Your Seed"
      link-location="/find-your-seed"
    />
    <div class="w-full bg-primary-2 text-white md:pl-20 pt-12">
      <h2 class="text-4xl">
        Knowledge Center
      </h2>
      <div class="md:flex md:flex-row py-4">
        <home-page-article-block />
        <home-page-article-block />
        <home-page-article-block />
      </div>
    </div>
    <div class="w-full bg-primary-2 text-white md:pl-20 pt-12">
      <h2 class="text-4xl">
        Market Analysis
      </h2>
      <div class="md:flex md:flex-row py-4">
        <home-page-article-block />
        <home-page-article-block />
        <home-page-article-block />
      </div>
    </div>
  <!-- /End replace -->
  </div>
</template>

<script>
import HomePageBlock from '../components/common/home-page-block.vue';
import HomePageArticleBlock from '../components/common/home-page-article-block.vue';

export default {
  components: {
    HomePageBlock,
    HomePageArticleBlock,
  },
  data: () => ({
    isFirst: true,
  }),
  head: {
    title: 'Home',
  },

};
</script>
