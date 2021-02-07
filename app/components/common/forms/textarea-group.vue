<template>
  <div>
    <field-label
      :for="id"
      class="ml-1 mb-1"
    >
      {{ label }}
    </field-label>
    <div :class="inputWrapperClasses">
      <div
        v-if="hasPrepend"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <slot name="prepend" />
      </div>
      <textarea-field
        :id="id"
        :class="inputClass"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :placeholder="placeholder"
        @input="$emit('input', $event)"
        @focus="$emit('focus', $event)"
      />
      <div
        v-if="hasAppend"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <slot name="append" />
      </div>
    </div>
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
import TextareaField from './textarea.vue';
import Hint from './hint.vue';

export default {
  components: {
    FieldLabel,
    TextareaField,
    Hint,
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
    readonly: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    max: {
      type: Number,
      default: null,
    },
    min: {
      type: Number,
      default: null,
    },
    step: {
      type: Number,
      default: null,
    },
  },

  computed: {
    inputWrapperClasses() {
      const classes = [];
      if (this.hasAppend || this.hasPrepend) classes.push('relative');
      return classes;
    },

    hasAppend() {
      return Boolean(this.$slots.append);
    },

    hasPrepend() {
      return Boolean(this.$slots.prepend);
    },

    showHint() {
      return Boolean(this.$slots.hint || this.hint);
    },
  },
};
</script>
