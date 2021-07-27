<template>
  <div class="bg-white rounded-lg shadow">
    <nuxt-link :to="linkLocation">
      <img class="rounded-t-lg" :src="articleImage">
    </nuxt-link>
    <div class="p-2">
      <h3 class="text-xl font-bold">
        <nuxt-link :to="linkLocation">
          {{ articleTitle }}
        </nuxt-link>
      </h3>
      <p class="text-md">
        {{ articleTease }}
      </p>
      <div class="justify-items-center">
        <btn
          class="text-md"
          type="button"
          color="logo-blue"
          @click="sendTo(linkLocation)"
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
    buttonLabel: {
      type: String,
      default: 'Read Article',
    },
    articleTitle: {
      type: String,
      default: 'Title Title Title Title Title Title Title Title Title',
    },
    articleTease: {
      type: String,
      default: 'Teaser',
    },
    articleImage: {
      type: String,
      default: 'http://placehold.jp/300x200.png',
    },
    linkLocation: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    isBlock: true,
  }),
  methods: {
    sendTo(location) {
      this.$router.push(location);
    },
  },
};
</script>
