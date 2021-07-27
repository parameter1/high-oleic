<template>
  <article-list-page title="Knowledge Center" :path="$route.path" />
</template>

<script>
import ArticleListPage from '../components/article-list-page.vue';

export default {
  components: {
    ArticleListPage,
  },
};
</script>
