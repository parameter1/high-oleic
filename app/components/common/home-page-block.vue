<template>
  <div :class="setDivClass">
    <div :class="setSectionLabelSize">
      <h1 v-if="isFirst" class="font-semibold text-center md:text-left">
        {{ sectionLabel }}
      </h1>
      <h2 v-else class="font-semibold text-center md:text-left">
        {{ sectionLabel }}
      </h2>
    </div>
    <div class="md:w-1/3">
      <btn
        class="text-3xl w-20"
        type="button"
        :block="isBlock"
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
      default: '',
    },
    sectionLabel: {
      type: String,
      default: '',
    },
    isFirst: {
      type: Boolean,
      default: false,
    },
    linkLocation: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    isBlock: true,
  }),
  computed: {
    setSectionLabelSize() {
      if (this.isFirst) {
        return 'h-4/6 text-5xl';
      }
      return 'h-4/5 text-4xl';
    },
    setDivClass() {
      if (this.isFirst) {
        return 'h-5/6 md:pl-20 pt-24';
      }
      return 'h-96 md:pl-20 py-12';
    },
  },
  methods: {
    sendTo(location) {
      this.$router.push(location);
    },
  },
};

</script>
