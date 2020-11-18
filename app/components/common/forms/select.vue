<template>
  <select
    :class="classes"
    :value="value"
    @input="$emit('input', $event.target.value)"
    @focus="$emit('focus', $event)"
  >
    <option value="">
      {{ placeholder }}
    </option>
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="getValue(option)"
      :selected="getValue(option) === value"
    >
      <slot
        name="option"
        :option="option"
        :index="index"
      >
        {{ getLabel(option) }}
      </slot>
    </option>
  </select>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: 'Select a value...',
    },
    optionValuePath: {
      type: String,
      default: 'value',
    },
    optionLabelPath: {
      type: String,
      default: 'label',
    },
  },

  data: () => ({
    classes: [
      'form-select',
      'block',
      'w-full',
      'pl-3',
      'pr-10',
      'py-2',
      'text-base',
      'leading-6',
      'border-cool-gray-300',
      'focus:outline-none',
      'focus:shadow-outline-secondary-5',
      'focus:border-secondary-5',
      'disabled:border-cool-gray-300',
      'disabled:bg-cool-cool-gray-50',
      'disabled:cursor-not-allowed',
      'transition',
      'duration-150',
      'ease-in-out',
      'sm:text-sm',
      'sm:leading-5',
      'shadow-sm',
    ],
  }),

  methods: {
    getValue(option) {
      return option[this.optionValuePath];
    },
    getLabel(option) {
      return option[this.optionLabelPath];
    },
  },
};
</script>
