<template>
  <input-group
    :id="id"
    :value="value"
    label="Farm name"
    :disabled="disabled"
    :required="required"
    hint="What is the farm name where you’re looking to place high oleic soy?"
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
};
</script>
