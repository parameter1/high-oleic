<template>
  <div class="pb-6">
    <page-intro-block
      :section-label="title"
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

  head() {
    return {
      title: this.title,
    };
  },
};
</script>
