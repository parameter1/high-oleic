<template>
  <div :class="wrapperClasses">
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
        :disabled="isLoading"
        @escape="$emit('input', false)"
      />
      <btn
        type="submit"
        :is-loading="isLoading"
      />
      <btn
        type="cancel"
        :is-loading="isLoading"
        @click="cancel"
      />
    </form>
    <hint
      v-if="value && error"
      :value="error.message"
    />
    <button
      v-if="!value"
      :class="editButtonClasses"
      @click.stop="$emit('input', true)"
    >
      <edit-icon class="w-5 h-5 text-gray-500" />
    </button>
  </div>
</template>

<script>
import Btn from './inline-input-editor/button.vue';
import EditIcon from './icons/pencil-alt-md.vue';
import Hint from './common/forms/hint.vue';
import InputField from './common/forms/input.vue';

export default {
  components: {
    Btn,
    EditIcon,
    Hint,
    InputField,
  },

  props: {
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
      if (!value) classes.push('inline-block');
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