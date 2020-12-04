<template>
  <input-group
    :id="id"
    :value="value"
    label="Projected market price"
    type="number"
    :min="0.01"
    :step="0.01"
    :disabled="disabled"
    :required="required"
    input-class="pl-7 pr-20"
    :hint="hint"
    @input="$emit('input', $event)"
    @focus="$emit('focus', $event)"
  >
    <template #prepend>
      <span class="text-gray-500 sm:text-sm sm:leading-5">
        $
      </span>
    </template>
    <template #append>
      <span class="text-gray-500 sm:text-sm sm:leading-5">
        per bushel
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
    crop: {
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
      const { crop } = this;
      const suffix = crop ? ` for ${crop}` : '';
      return `What market price would you like to use${suffix}, in dollars per bushel`;
    },
  },
};
</script>
