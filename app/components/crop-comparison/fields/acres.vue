<template>
  <input-group
    :id="id"
    :value="value"
    label="How many acres is this field?"
    type="number"
    :min="1"
    hint="Only include the acres being evaluated for high oleic production for accurate comparison"
    :disabled="disabled"
    :required="required"
    @input="$emit('input', $event)"
    @focus="$emit('focus', $event)"
  />
</template>

<script>
import InputGroup from '../../common/forms/input-group.vue';

export default {
  components: { InputGroup },

  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
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
};
</script>
