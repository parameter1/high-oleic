<template>
  <div>
    <field-label
      :for="id"
      class="ml-1 mb-1"
    >
      {{ label }}
    </field-label>
    <select-field
      :id="id"
      :class="inputClass"
      :value="value"
      :disabled="disabled"
      :required="required"
      :placeholder="placeholder"
      :options="options"
      @input="$emit('input', $event)"
      @focus="$emit('focus', $event)"
    />
    <slot
      v-if="showHint"
      name="hint"
    >
      <hint :value="hint" />
    </slot>
  </div>
</template>

<script>
import FieldLabel from './label.vue';
import Hint from './hint.vue';
import SelectField from './select.vue';

export default {
  components: {
    FieldLabel,
    Hint,
    SelectField,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    hint: {
      type: String,
      default: null,
    },
    inputClass: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
  },

  computed: {
    showHint() {
      return Boolean(this.$slots.hint || this.hint);
    },
  },
};
</script>
