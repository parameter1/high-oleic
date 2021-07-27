<template>
  <div class="pt-2 pb-6 md:py-6 overflow-y-scroll">
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <div class="p-4">
        <div class="h-screen">
          <!-- Replace with your content -->
          <div class="py-4 h-full">
            <div class="md:pl-10">
              <h1
                class="text-2xl capitalize font-semibold text-center md:text-left"
              >
                Why High Oleic?
              </h1>
            </div>
            <div class="mt-40 border-secondary-5-300 border-b-2" />
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-secondary-5-300 border-b-2 px-10 py-10"
            >
              <div
                v-for="article in displayArticles"
                :key="article.name"
                class="md:mr-10 mb-10 lg:mb-0"
              >
                <home-page-article-block
                  :article-title="article.name"
                  :article-tease="article.teaser"
                  :link-location="article.alias"
                />
              </div>
            </div>
            <!-- /End replace -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomePageArticleBlock from '../components/common/home-page-article-block.vue';
import articles from '../../server/src/articles/articles';

export default {
  components: {
    HomePageArticleBlock,
  },
  data: () => ({
    articles,
  }),
  computed: {
    displayArticles() {
      const internalArticles = this.articles.filter((item) => item.scheduledSections.includes('why-high-oleic'));
      return internalArticles;
    },
  },
  head() {
    return {
      title: 'Why High Oleic?',
    };
  },
};
</script>
