<template>
  <select-group
    :id="id"
    :value="value"
    label="Crop to compare High Oleic Soybeans to"
    :disabled="disabled"
    :required="required"
    hint="Which crop would you like to compare to high oleic production?"
    placeholder="Select a crop..."
    :options="cropOptions"
    @input="$emit('input', $event)"
    @focus="$emit('focus', $event)"
  />
</template>

<script>
import SelectGroup from '../../common/forms/select-group.vue';
import cropOptions from '../crop-options';

export default {
  components: { SelectGroup },

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

  computed: {
    cropOptions() {
      return cropOptions();
    },
  },
};
</script>
