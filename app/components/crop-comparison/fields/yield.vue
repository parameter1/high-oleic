<template>
  <input-group
    :id="id"
    :value="value"
    :label="label"
    type="number"
    :min="1"
    :disabled="disabled"
    :required="required"
    input-class="pr-32"
    hint="The yield of the crop, in bushels per acre"
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
    label() {
      const { crop } = this;
      const suffix = crop ? ` of ${crop}` : '';
      return `What is the yield${suffix}?`;
    },
  },
};
</script>
