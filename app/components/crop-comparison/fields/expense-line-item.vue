<template>
  <input-group
    :id="id"
    v-currency
    :value="value"
    :label="label"
    :min="0"
    :step="0.01"
    :required="required"
    :disabled="disabled"
    input-class="pr-20"
    :hint="hint"
    @input="input"
    @focus="$emit('focus', $event)"
  >
    <template #append>
      <span class="text-gray-500 sm:text-sm sm:leading-5">
        {{ unitLabel }}
      </span>
    </template>
  </input-group>
</template>

<script>
import InputGroup from '../../common/forms/input-group.vue';
import hints from '../line-item-hints';
import labels from '../line-item-labels';
import parse from '../../../utils/parse-currency';

export default {
  components: { InputGroup },

  props: {
    id: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      validator: (unit) => ['PER_ACRE', 'PER_BUSHEL'].includes(unit),
    },
    lineItemId: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: null,
    },
    cropName: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    hint() {
      const hint = hints({ id: this.lineItemId, cropName: this.cropName });
      if (!hint) return null;
      return hint.replace(this.label, '').trim();
    },
    label() {
      return labels({ id: this.lineItemId, cropName: this.cropName });
    },
    unitLabel() {
      const { unit } = this;
      if (unit === 'PER_ACRE') return 'per acre';
      if (unit === 'PER_BUSHEL') return 'per bushel';
      return null;
    },
  },

  methods: {
    input(value) {
      this.$emit('input', parse(value));
    },
  },
};
</script>
