<template>
  <inline-editor
    :tag="tag"
    :value="value"
    :input-attrs="settings.attrs"
    :hint="settings.hint"
    :save-func="update.bind(this)"
    :disabled="disabled"
    @saving="$emit('saving', $event)"
  >
    <format-number format="integer" :value="value" />
  </inline-editor>
</template>

<script>
import FormatNumber from '../../format-number.vue';
import InlineEditor from '../../inline-input-editor.vue';

import fieldSettings from '../field-settings';
import { UPDATE_COMPARISON_REPORT_ACRES } from '../../../graphql/mutations';

export default {
  components: { FormatNumber, InlineEditor },

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

  data: () => ({
    settings: fieldSettings.acres(),
  }),

  methods: {
    async update({ newValue }) {
      const input = { id: this.comparisonId, acres: parseInt(newValue, 10) };
      await this.$apollo.mutate({
        mutation: UPDATE_COMPARISON_REPORT_ACRES,
        variables: { input },
      });
    },
  },
};
</script>
