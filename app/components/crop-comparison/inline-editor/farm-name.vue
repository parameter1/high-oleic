<template>
  <inline-editor
    :tag="tag"
    :value="value"
    :input-attrs="{ type: 'text', required: true }"
    :save-func="update.bind(this)"
    :disabled="disabled"
    @saving="$emit('saving', $event)"
  >
    {{ value }}
  </inline-editor>
</template>

<script>
import InlineEditor from '../../inline-input-editor.vue';

import { UPDATE_COMPARISON_REPORT_FARM_NAME } from '../../../graphql/mutations';

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
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    async update({ newValue }) {
      const input = { id: this.comparisonId, farmName: newValue };
      await this.$apollo.mutate({
        mutation: UPDATE_COMPARISON_REPORT_FARM_NAME,
        variables: { input },
      });
    },
  },
};
</script>
