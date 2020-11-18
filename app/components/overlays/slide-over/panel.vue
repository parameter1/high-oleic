<template>
  <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
    <div class="flex-1 h-0 overflow-y-auto">
      <panel-header
        :title="title"
        :description="description"
        :close-button="closeButton"
        @close="$emit('close', $event)"
      >
        <template #title>
          <slot name="title" />
        </template>
        <template #description>
          <slot name="description" />
        </template>
      </panel-header>
      <div class="flex-1 flex flex-col justify-between">
        <slot name="body" />
      </div>
    </div>
    <div
      v-if="hasFooterSlot"
      class="flex-shrink-0 p-4 flex flex-col"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import PanelHeader from './panel/header.vue';

export default {
  components: { PanelHeader },

  props: {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    closeButton: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    hasFooterSlot() {
      return Boolean(this.$slots.footer);
    },
  },
};
</script>
