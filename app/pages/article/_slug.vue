<template>
  <div class="pb-6 overflow-y-scroll">
    <page-intro-block
      :section-label="article.title"
      :section-tagline="article.teaser"
      :image="getImagePath(article.image)"
      background-image-class="bg-home-banner"
    />
    <div class="pt-2 pb-6 md:py-6">
      <div class="max-w-4xl mx-auto sm:px-6 md:px-8">
        <h1 class="text-3xl font-semibold mb-5 px-4">
          {{ article.title }}
        </h1>
        <div class="p-4">
          <div class="prose prose-lg text-primary-1" v-html="article.body" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageIntroBlock from '../../components/common/page-intro-block.vue';
import { LOAD_ARTICLE } from '../../graphql/queries';

export default {
  components: {
    PageIntroBlock,
  },
  apollo: {
    article: {
      query: LOAD_ARTICLE,
      fetchPolicy: 'cache-and-network',
      variables() {
        return { slug: this.slug };
      },
      prefetch: true,
    },
  },

  data: () => ({
    article: {},
  }),

  computed: {
    slug() {
      return this.$route.params.slug;
    },
  },
  methods: {
    getImagePath(path) {
      if (!path) return '';
      return `${path}?w=2000&h=300&fit=crop`;
    },
  },

  head() {
    return {
      title: this.article.title,
    };
  },
};
</script>
