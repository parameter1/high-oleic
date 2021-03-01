<template>
  <input-group
    :id="id"
    :value="value"
    label="Projected market price for High Oleic Soybeans"
    type="number"
    :min="settings.attrs.min"
    :step="settings.attrs.step"
    :required="settings.attrs.required"
    :disabled="disabled"
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
import fieldSettings from '../field-settings';

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
    settings: fieldSettings.pricePerBushel({ crop: 'High Oleic Soybeans' }),
    hint: 'What market price would you like to use for High Oleic Soybeans, in dollars per bushel? High Oleic Soybeans are generally marketed at the same exact price as regular soybeans- use the same number you market regular soybeans at, without premium, or the same number you used on the prior tab if comparing to regular soybean production.',
  }),
};
</script>
