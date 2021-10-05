<template>
  <div class="pb-6 overflow-y-scroll">
    <page-intro-block
      section-label="Grow High Oleic Soy"
      section-tagline="The Yield You Want. The Demand You Need."
      background-image-class="bg-home-banner"
      :section-text="sectionText"
      button-label="FIND OUT WHY"
      link-location="/why-high-oleic"
    />
    <div class="pt-2 pb-6 md:py-6">
      <div class="max-w-4xl mx-auto sm:px-6 md:px-8">
        <div class="p-4">
          <div :class="containerClasses">
            <home-page-article-block
              v-for="article in articles"
              :key="article.id"
              :image="article.image"
              :title="article.title"
              :teaser="article.teaser"
              :button-label="article.buttonLabel"
              :href="article.slug"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageIntroBlock from '../components/common/page-intro-block.vue';
import HomePageArticleBlock from '../components/common/home-page-article-block.vue';

export default {
  components: {
    HomePageArticleBlock,
    PageIntroBlock,
  },

  data: () => ({
    isFirst: true,
    containerClasses: [
      'grid',
      'grid-cols-1',
      'md:grid-cols-3',
      'gap-4',
    ],
    sectionText: 'Today\'s High oleic soybeans — those with higher oleic acid content that eliminates the need for hydrogenation, thus making them a healthier alternative to conventional soybeans when processed for vegetable oil — fill the supply needs, with the required attributes',
    articles: [
      {
        id: 'highOleic',
        image: 'https://img.highoilsoy.com/profit-home.jpg?fit=crop&w=300&h=200',
        title: 'High Oleic Profit Potential Calculator',
        teaser: 'Decide for yourself what your farm’s profit opportunity could be with High Oleic soybeans, by using our Profit Manager tool',
        buttonLabel: 'Access Tool',
        slug: '/crop-comparison',
      },
      {
        id: 'knowledge',
        image: 'https://img.highoilsoy.com/knowledge-home.jpg?fit=crop&w=300&h=200',
        title: 'Knowledge Center',
        teaser: 'Knowledge is power. Put the power of the latest research, seed information and breaking news, to help you make more informed management decisions.',
        buttonLabel: 'Read the Latest',
        slug: '/knowledge-center',
      },
      {
        id: 'findElevator',
        image: 'https://img.highoilsoy.com/elevator-home.jpg?fit=crop&w=300&h=200',
        title: 'Find a High Oleic Elevator Near You',
        teaser: 'Not sure where to market your High Oleic soybeans? Find the answer below.',
        buttonLabel: 'Find Elevators',
        slug: '/find-your-elevator',
      },
    ],
  }),

  head: {
    title: 'Home',
  },
};
</script>
