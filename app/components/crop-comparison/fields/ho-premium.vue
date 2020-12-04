<template>
  <input-group
    :id="id"
    :value="value"
    label="What do you anticipate the premium to be on High Oleic in your area?"
    type="number"
    :min="settings.attrs.min"
    :step="settings.attrs.step"
    :required="settings.attrs.required"
    :disabled="disabled"
    input-class="pl-7 pr-20"
    :hint="settings.hint"
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
    settings: fieldSettings.premiumPerBushel(),
  }),
};
</script>
