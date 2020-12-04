<template>
  <input-group
    :id="id"
    :value="value"
    label="What is your anticipated yield of High Oleic Soybeans?"
    type="number"
    :min="1"
    required
    :disabled="disabled"
    input-class="pr-32"
    hint="High Oleic Soybeans yield the same or better than regular soybeans in almost all cases."
    @input="$emit('input', $event)"
    @focus="$emit('focus', $event)"
  >
    <template #append>
      <span class="text-gray-500 sm:text-sm sm:leading-5">
        bushels per acre
      </span>
    </template>
  </input-group>
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
