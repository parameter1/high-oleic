<template>
  <div :class="setDivClass">
    <div :class="setSectionLabelSize">
      <h1 v-if="isFirst">
        {{ sectionLabel }}
      </h1>
      <h2 v-else>
        {{ sectionLabel }}
      </h2>
    </div>
    <div class="md:w-1/3">
      <btn
        class="text-3xl w-20"
        type="button"
        :block="isBlock"
        color="logo-green"
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
        return 'bg-primary-1 text-white h-5/6 md:pl-20 pt-24';
      }
      return 'bg-primary-2 text-white h-96 md:pl-20 pt-12';
    },
  },
  methods: {
    sendTo(location) {
      this.$router.push(location);
    },
  },
};

</script>
