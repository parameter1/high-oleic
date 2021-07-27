<template>
  <article-list-page title="Find Your Seed" :path="$route.path" />
</template>

<script>
import ArticleListPage from '../components/article-list-page.vue';

export default {
  components: {
    ArticleListPage,
  },
};
</script>
