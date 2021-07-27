<template>
  <article-list-page title="Why High Oleic?" :path="$route.path" />
</template>

<script>
import ArticleListPage from '../components/article-list-page.vue';

export default {
  components: {
    ArticleListPage,
  },
};
</script>
