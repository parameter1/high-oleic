<template>
  <div class="pb-6">
    <page-intro-block
      :section-label="title"
      background-image-class="bg-home-banner"
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
      default: 'Market Analysis',
    },
  },

  data: () => ({
    sectionText: '<p>The time has never been better to adopt high oleic soybeans production. The market opportunity is real, it’s domestic and it’s happening right now!</p>',
  }),

  head() {
    return {
      title: this.title,
    };
  },
};
</script>
