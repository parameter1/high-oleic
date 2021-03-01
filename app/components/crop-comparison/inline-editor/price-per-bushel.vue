<template>
  <inline-editor
    v-currency
    :can-edit="canEdit"
    :tag="tag"
    :value="value"
    :input-attrs="{ ...settings.attrs, type: 'text' }"
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
import { parse } from 'vue-currency-input';
import FormatNumber from '../../format-number.vue';
import InlineEditor from '../../inline-input-editor.vue';

import fieldSettings from '../field-settings';
import currencyOptions from '../../../currency-options';
import { UPDATE_COMPARISON_REPORT_PRICE_PER_BUSHEL } from '../../../graphql/mutations';

export default {
  components: { FormatNumber, InlineEditor },

  props: {
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
    settings() {
      return fieldSettings.pricePerBushel({ crop: this.cropName });
    },
  },

  methods: {
    async update({ newValue }) {
      if (!this.canEdit) return;
      const input = {
        id: this.comparisonId,
        applyTo: this.applyTo,
        pricePerBushel: parse(newValue, currencyOptions),
      };
      await this.$apollo.mutate({
        mutation: UPDATE_COMPARISON_REPORT_PRICE_PER_BUSHEL,
        variables: { input },
      });
    },
  },
};
</script>
