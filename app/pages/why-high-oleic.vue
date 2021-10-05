<template>
  <div class="pb-6">
    <page-intro-block
      :section-label="title"
      section-tagline="The Yield You Want. The Demand You Need."
      :section-text="sectionText"
      background-image-class="bg-why-banner"
    />
    <article-list-page :path="$route.path" />
  </div>
</template>

<script>
import ArticleListPage from '../components/article-list-page.vue';
import PageIntroBlock from '../components/common/page-intro-block.vue';

export default {
  components: {
    ArticleListPage,
    PageIntroBlock,
  },

  props: {
    title: {
      type: String,
      default: 'Why High Oleic?',
    },
  },

  data: () => ({
    sectionText: '<p class="mb-6">Why High-oleic? Because high-oleic soybeans present producers with an immediate opportunity to make money without significantly changing how they farm.</p><p>This site navigates you through the pathway to success with high-oleic soybeans while debunking myths on adding high-oleic to your farm’s overall management strategy.</p>',
  }),

  head() {
    return {
      title: this.title,
    };
  },
};
</script>
