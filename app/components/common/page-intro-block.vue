<template>
  <div :class="setDivClass">
    <div :class="setSectionLabelSize">
      <!-- <div class="h-full flex justify-center flex-col bg-gray-500 bg-opacity-50"> -->
      <div class="h-full flex justify-center flex-col">
        <h1 class="font-bold italic text-white text-center text-shadow-dark">
          {{ sectionLabel }}
        </h1>
        <p v-if="sectionTagline" class="font-bold text-center text-white text-shadow-dark">
          {{ sectionTagline }}
        </p>
      </div>
    </div>
    <p v-if="sectionText" class="text-sm w-4/6 mb-6 mx-auto">
      {{ sectionText }}
    </p>
    <div v-if="linkLocation" class="w-100% flex justify-center">
      <btn
        class="w-auto"
        type="button"
        :block="isBlock"
        color="logo-yellow"
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
      default: '',
    },
    backgroundImageClass: {
      type: String,
      default: 'bg-home-banner',
    },
    sectionLabel: {
      type: String,
      default: '',
    },
    sectionTagline: {
      type: String,
      default: '',
    },
    sectionText: {
      type: String,
      default: '',
    },
    linkLocation: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    isBlock: false,
  }),
  computed: {
    setSectionLabelSize() {
      return `h-72 mb-6 ${this.backgroundImageClass} bg-cover bg-center`;
    },
    setDivClass() {
      // if (this.isFirst) {
      //   return 'h-5/6';
      // }
      return 'h-auto';
    },
  },
  methods: {
    sendTo(location) {
      this.$router.push(location);
    },
  },
};

</script>
