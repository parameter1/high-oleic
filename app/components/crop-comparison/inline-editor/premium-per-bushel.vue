<template>
  <inline-editor
    :tag="tag"
    :value="value"
    :input-attrs="settings.attrs"
    :hint="settings.hint"
    :save-func="update.bind(this)"
    :disabled="disabled"
    @saving="$emit('saving', $event)"
    @editing="$emit('editing', $event)"
  >
    <format-number #default="{ formatted }" format="usd" :value="value">
      {{ formatted }} per bushel
    </format-number>
  </inline-editor>
</template>

<script>
import FormatNumber from '../../format-number.vue';
import InlineEditor from '../../inline-input-editor.vue';

import fieldSettings from '../field-settings';
import { UPDATE_COMPARISON_REPORT_PREMIUM_PER_BUSHEL } from '../../../graphql/mutations';

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
    cropName: {
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

  computed: {
    settings() {
      return fieldSettings.premiumPerBushel({ crop: this.cropName });
    },
  },

  methods: {
    async update({ newValue }) {
      const input = {
        id: this.comparisonId,
        applyTo: this.applyTo,
        premiumPerBushel: parseFloat(newValue),
      };
      await this.$apollo.mutate({
        mutation: UPDATE_COMPARISON_REPORT_PREMIUM_PER_BUSHEL,
        variables: { input },
      });
    },
  },
};
</script>
