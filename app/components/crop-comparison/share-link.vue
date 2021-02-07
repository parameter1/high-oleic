<template>
  <div>
    <input-group
      id="share-report.public-link"
      :value="link"
      :hint="hint"
      label="Public link"
      type="text"
      readonly
    />
    <btn
      v-clipboard="link"
      v-clipboard:success="setCopied"
      class="mt-2"
      title="Copy share link to clipboard"
    >
      {{ buttonLabel }}
    </btn>
  </div>
</template>

<script>
import Btn from '../common/button.vue';
import InputGroup from '../common/forms/input-group.vue';

export default {
  components: { Btn, InputGroup },

  props: {
    link: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    id: 'share-report.public-link',
    didCopy: false,
    hint: 'Copy this link and give it to anyone you\'d like to access this report. Anyone using this link can only read the report and cannot edit any values.',
  }),

  computed: {
    buttonLabel() {
      if (this.didCopy) return 'Link Copied!';
      return 'Click to Copy Link';
    },
  },

  methods: {
    setCopied() {
      this.didCopy = true;
      setTimeout(() => {
        this.didCopy = false;
      }, 1000);
    },
  },
};
</script>
