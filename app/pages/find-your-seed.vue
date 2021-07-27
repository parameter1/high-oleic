<template>
  <article-list-page title="Find Your Seed" :path="$route.path">
    <template #grid-before>
      <home-page-article-block
        title="Find Your Elevator"
        teaser="Find grain elevators near your zip code."
        href="/find-your-elevator"
        button-label="Search Elevators"
      />
    </template>
  </article-list-page>
</template>

<script>
import ArticleListPage from '../components/article-list-page.vue';
import HomePageArticleBlock from '../components/common/home-page-article-block.vue';

export default {
  components: {
    ArticleListPage,
    HomePageArticleBlock,
  },
};
</script>
