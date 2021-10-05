<template>
  <div class="pb-6">
    <page-intro-block
      :section-label="title"
      background-image-class="bg-knowledge-banner"
      section-tagline="Knowledge is power"
      :section-text="sectionText"
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
      default: 'Knowledge Center',
    },
  },

  data: () => ({
    sectionText: '<p>Knowledge is power.  Put the power of the latest research, varietal performance information, breaking news and much more, at your fingertips to help you make key management decisions.</p>',
  }),

  head() {
    return {
      title: this.title,
    };
  },
};
</script>
