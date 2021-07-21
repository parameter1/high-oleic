<template>
  <div class="h-screen overflow-y-scroll">
    <!-- Replace with your content -->
    <div class="py-4 bg-primary-1 h-full text-white md:pl-20">
      <h1 class="text-5xl">
        Why High Oleic?
      </h1>
      <div class="py-40 grid grid-cols-1 md:grid-cols-2">
        <home-page-article-block
          v-for="article in articles"
          :key="article.name"
          :article-title="article.name"
          :article-tease="article.teaser"
          :link-location="article.alias"
        />
      </div>
    </div>
    <!-- /End replace -->
  </div>
</template>

<script>
import HomePageArticleBlock from '../components/common/home-page-article-block.vue';
import articles from '../../server/src/why-high-oleic/articles';

export default {
  components: {
    HomePageArticleBlock,
  },
  data: () => ({
    articles,
  }),
  head: {
    title: 'Why High Oleic?',
  },
};
</script>
