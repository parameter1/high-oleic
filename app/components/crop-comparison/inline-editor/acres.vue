<template>
  <inline-editor
    :tag="tag"
    :value="value"
    :input-attrs="{ type: 'number', min: 1, required: true }"
    :save-func="updateAcres.bind(this)"
    @saving="$emit('saving', $event)"
  >
    {{ formatInteger(value) }}
  </inline-editor>
</template>

<script>
import InlineEditor from '../../inline-input-editor.vue';
import formatNumber from '../../../utils/format-number';

import { UPDATE_COMPARISON_ACRES } from '../../../graphql/mutations';

export default {
  components: { InlineEditor },

  props: {
    comparisonId: {
      type: String,
      required: true,
    },

    tag: {
      type: String,
      default: 'div',
    },
    value: {
      type: [Number, String],
      default: null,
    },
  },

  methods: {
    formatInteger(value) {
      return formatNumber.integer(value);
    },

    async updateAcres({ newValue }) {
      const input = { id: this.comparisonId, acres: parseInt(newValue, 10) };
      await this.$apollo.mutate({
        mutation: UPDATE_COMPARISON_ACRES,
        variables: { input },
      });
    },
  },
};
</script>
