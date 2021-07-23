<template>
  <div class="bg-white text-center rounded-lg py-2 shadow grid justify-items-center">
    <img :src="articleImage">
    <h3 class="text-xl font-bold pt-2">
      {{ articleTitle }}
    </h3>
    <p class="text-md px-2 py-2 mb-2">
      {{ articleTease }}
    </p>
    <div class="grid justify-items-center">
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
