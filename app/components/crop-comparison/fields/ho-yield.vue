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
    :hint="hint"
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

  data: () => ({
    hint: 'High Oleic Soybeans yield the same or even better than regular soybeans in almost all cases. If you don’t have an anticipated yield, use your soybean APH for your farm, or the same number you input if comparing to soybeans on the prior tab.',
  }),
};
</script>
