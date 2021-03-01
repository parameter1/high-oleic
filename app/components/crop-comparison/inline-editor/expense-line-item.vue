<template>
  <inline-editor
    v-currency
    :can-edit="canEdit"
    :tag="tag"
    :value="value"
    :input-attrs="{ type: 'text', min: 0, step: 0.01, required: true }"
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
import { parse } from 'vue-currency-input';
import FormatNumber from '../../format-number.vue';
import InlineEditor from '../../inline-input-editor.vue';
import lineItemHints from '../line-item-hints';
import sharedLineItems from '../shared-line-items';
import currencyOptions from '../../../currency-options';

import { UPDATE_COMPARISON_REPORT_EXPENSES } from '../../../graphql/mutations';

export default {
  components: { FormatNumber, InlineEditor },

  props: {
    lineItem: {
      type: Object,
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

  computed: {
    hint() {
      return lineItemHints({ id: this.lineItem.id, cropName: this.cropName });
    },
    inputKey() {
      const [key] = this.lineItem.id.split('.');
      return key;
    },
    type() {
      return this.lineItem[`${this.inputKey}Type`];
    },
    applyToOleic() {
      return this.applyTo === 'COMPARED_CROP' && sharedLineItems.includes(this.lineItem.id);
    },
  },

  methods: {
    async update({ newValue }) {
      if (!this.canEdit) return;
      const applies = [this.applyTo];
      if (this.applyToOleic) applies.push('OLEIC');
      const input = {
        id: this.comparisonId,
        [this.inputKey]: applies.map((applyTo) => ({
          applyTo,
          lineItem: this.type,
          value: parse(newValue, currencyOptions),
        })),
      };
      await this.$apollo.mutate({
        mutation: UPDATE_COMPARISON_REPORT_EXPENSES,
        variables: { input },
      });
      this.$emit('editing', false);
    },
  },
};
</script>
