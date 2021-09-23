<template>
  <div class="pb-6">
    <page-intro-block
      :section-label="title"
      section-tagline="The Yeild You Want. The Demand You Need."
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

  head() {
    return {
      title: this.title,
    };
  },
};
</script>
