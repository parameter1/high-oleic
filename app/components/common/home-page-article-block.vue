<template>
  <div class="bg-white shadow flex flex-col h-full">
    <nuxt-link :to="href">
      <img class="w-full h-auto" :src="image">
    </nuxt-link>
    <div class="p-3 flex flex-col h-full">
      <h3 class="font-bold italic text-logo-blue text-center flex-grow">
        <nuxt-link :to="href">
          {{ title }}
        </nuxt-link>
      </h3>
      <p v-if="teaser" class="text-sm text-center mt-3 flex-grow">
        {{ teaser }}
      </p>
      <div class="flex">
        <btn
          class="text-md mt-3 mx-auto text-upper"
          type="button"
          color="logo-blue"
          @click="goToArticle"
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
    href: {
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

  methods: {
    goToArticle() {
      this.$router.push(this.href);
    },
  },
};
</script>
