<template>
  <inline-editor
    :can-edit="canEdit"
    :tag="tag"
    :value="value"
    :input-attrs="settings.attrs"
    :hint="settings.hint"
    :save-func="update.bind(this)"
    :disabled="disabled"
    @saving="$emit('saving', $event)"
    @editing="$emit('editing', $event)"
  >
    <format-number #default="{ formatted }" format="integer" :value="value">
      {{ formatted }} bushels per acre
    </format-number>
  </inline-editor>
</template>

<script>
import FormatNumber from '../../format-number.vue';
import InlineEditor from '../../inline-input-editor.vue';

import fieldSettings from '../field-settings';
import { UPDATE_COMPARISON_REPORT_YIELD_PER_ACRE } from '../../../graphql/mutations';

export default {
  components: { FormatNumber, InlineEditor },

  props: {
    applyTo: {
      type: String,
      required: true,
      validator: (applyTo) => ['OLEIC', 'COMPARED_CROP'].includes(applyTo),
    },
    comparisonId: {
      type: String,
      required: true,
    },
    canEdit: {
      type: Boolean,
      default: true,
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
    settings: fieldSettings.yieldPerAcre(),
  }),

  methods: {
    async update({ newValue }) {
      if (!this.canEdit) return;
      const input = {
        id: this.comparisonId,
        applyTo: this.applyTo,
        yieldPerAcre: parseInt(newValue, 10),
      };
      await this.$apollo.mutate({
        mutation: UPDATE_COMPARISON_REPORT_YIELD_PER_ACRE,
        variables: { input },
      });
    },
  },
};
</script>
