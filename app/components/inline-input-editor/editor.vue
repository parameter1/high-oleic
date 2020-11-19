<template>
  <component
    :is="tag"
    :class="wrapperClasses"
  >
    <slot v-if="!value" />
    <form
      v-show="value"
      class="flex shadow-sm"
      @submit.prevent="$emit('submit', current)"
    >
      <input-field
        ref="editor"
        v-model="current"
        v-bind="inputAttrs"
        class="rounded-r-none shadow-none focus-within:z-10"
        :disabled="disabled || isLoading"
        @escape="$emit('input', false)"
      />
      <btn
        type="submit"
        :disabled="disabled"
        :is-loading="isLoading"
      />
      <btn
        type="cancel"
        :disabled="disabled"
        :is-loading="isLoading"
        @click="cancel"
      />
    </form>
    <hint v-if="value && error">
      <span class="text-red-500">
        <error-icon class="w-4 h-4 inline-block" />
        {{ error.message }}
      </span>
    </hint>
    <button
      v-if="!value"
      :class="editButtonClasses"
      @click.stop="$emit('input', true)"
    >
      <edit-icon class="w-5 h-5 text-secondary-4" />
    </button>
  </component>
</template>

<script>
import Btn from './button.vue';
import EditIcon from '../icons/pencil-alt-sm.vue';
import ErrorIcon from '../icons/exclamation-sm.vue';
import Hint from '../common/forms/hint.vue';
import InputField from '../common/forms/input.vue';

export default {
  components: {
    Btn,
    EditIcon,
    ErrorIcon,
    Hint,
    InputField,
  },

  props: {
    tag: {
      type: String,
      default: 'div',
    },
    value: {
      type: Boolean,
      default: false,
    },
    inputValue: {
      type: String,
      default: null,
    },
    inputAttrs: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Error,
      default: null,
    },
  },

  data: () => ({
    current: null,
    editButtonClasses: [
      'my-auto',
      'ml-1',
      'inline-block',
      'focus:outline-none',
      'focus:shadow-outline-secondary-5',
      'focus:border-secondary-5',
      'rounded',
    ],
  }),

  computed: {
    wrapperClasses() {
      const classes = [];
      const { value } = this;
      if (!value) classes.push('inline-flex');
      return classes;
    },
  },

  watch: {
    value(v) {
      if (v) {
        this.$nextTick(() => {
          this.$refs.editor.$el.focus();
        });
      }
    },
  },

  created() {
    this.current = this.inputValue;
  },

  methods: {
    cancel() {
      this.$emit('input', false);
      this.current = this.inputValue;
    },
  },
};
</script>
