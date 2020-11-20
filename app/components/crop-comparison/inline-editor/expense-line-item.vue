<template>
  <inline-editor
    :tag="tag"
    :value="value"
    :input-attrs="{ type: 'number', min: 0, step: 0.01, required: true }"
    :hint="hint"
    :save-func="update.bind(this)"
    :disabled="disabled"
    @saving="$emit('saving', $event)"
    @editing="$emit('editing', $event)"
  >
    <format-number format="usd" :value="value" />
  </inline-editor>
</template>

<script>
import FormatNumber from '../../format-number.vue';
import InlineEditor from '../../inline-input-editor.vue';
import lineItemHints from '../line-item-hints';

import { UPDATE_COMPARISON_REPORT_PRICE_PER_BUSHEL } from '../../../graphql/mutations';

export default {
  components: { FormatNumber, InlineEditor },

  props: {
    lineItemId: {
      type: String,
      required: true,
    },
    cropName: {
      type: String,
      required: true,
    },
    applyTo: {
      type: String,
      required: true,
      validator: (applyTo) => ['OLEIC', 'COMPARED_CROP'].includes(applyTo),
    },
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

  computed: {
    hint() {
      return lineItemHints({ id: this.lineItemId, cropName: this.cropName });
    },
  },

  methods: {
    async update({ newValue }) {
      throw new Error('NYI');
      const input = {
        id: this.comparisonId,
        applyTo: this.applyTo,
        pricePerBushel: parseFloat(newValue),
      };
      await this.$apollo.mutate({
        mutation: UPDATE_COMPARISON_REPORT_PRICE_PER_BUSHEL,
        variables: { input },
      });
    },
  },
};
</script>
