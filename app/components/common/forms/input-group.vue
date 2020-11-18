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
      <input-field
        :id="id"
        :class="inputClass"
        :type="type"
        :value="value"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :max="max"
        :min="min"
        :step="step"
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
      <p class="text-xs text-cool-gray-500 mt-2 ml-1">
        {{ hint }}
      </p>
    </slot>
  </div>
</template>

<script>
import FieldLabel from './label.vue';
import InputField from './input.vue';

export default {
  components: {
    FieldLabel,
    InputField,
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
    type: {
      type: String,
      default: null,
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
    value: {
      type: String,
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
