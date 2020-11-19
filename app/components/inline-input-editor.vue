<template>
  <inline-editor
    v-model="isEditing"
    :tag="tag"
    :input-value="inputValue"
    :input-attrs="inputAttrs"
    :is-loading="isSaving"
    :error="error"
    :disabled="disabled"
    @submit="save"
  >
    <slot />
  </inline-editor>
</template>

<script>
import GraphQLError from '../utils/graphql-error';
import InlineEditor from './inline-input-editor/editor.vue';

export default {
  components: { InlineEditor },

  props: {
    saveFunc: {
      type: Function,
      required: true,
    },
    tag: {
      type: String,
      default: 'div',
    },
    value: {
      type: [Number, String],
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
  },

  data: () => ({
    error: null,
    isEditing: false,
    isSaving: false,
  }),

  computed: {
    inputValue() {
      return `${this.value}`;
    },
  },

  methods: {
    async save(value) {
      try {
        this.error = null;
        this.isSaving = true;
        this.$emit('saving', true);
        await this.saveFunc({ newValue: value });
        this.isEditing = false;
      } catch (e) {
        this.error = new GraphQLError(e);
      } finally {
        this.isSaving = false;
        this.$emit('saving', false);
      }
    },
  },
};
</script>
