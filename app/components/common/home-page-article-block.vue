<template>
  <div class="bg-white rounded-lg shadow flex flex-col h-full">
    <nuxt-link :to="href">
      <img class="rounded-t-lg w-full h-auto" :src="image">
    </nuxt-link>
    <div class="p-3 flex flex-col h-full">
      <h3 class="text-xl font-bold">
        <nuxt-link :to="href">
          {{ title }}
        </nuxt-link>
      </h3>
      <p v-if="teaser" class="text-md mt-3 flex-grow">
        {{ teaser }}
      </p>
      <div class="flex">
        <btn
          class="text-md mt-3 mx-auto"
          type="button"
          color="logo-blue"
          @click="sendTo(href)"
        >
          {{ buttonLabel }}
        </btn>
      </div>
    </div>
  </div>
</template>

<script>
import Btn from './button.vue';

export default {
  components: {
    Btn,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    teaser: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: 'http://placehold.jp/300x200.png',
    },
    buttonLabel: {
      type: String,
      default: 'Read Article',
    },
  },

  computed: {
    href() {
      return `/article/${this.slug}`;
    },
  },

  methods: {
    goToArticle() {
      this.$router.push(this.href);
    },
  },
};
</script>
